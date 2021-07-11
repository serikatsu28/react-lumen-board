<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Illuminate\Http\Exceptions\HttpResponseException;
use App\Models\User;
use Illuminate\Support\Facades\Mail;
use App\Mail\SendMail;
use Carbon\Carbon;

class UserController extends Controller
{
    /**
    * メール送信 & DBへ登録
    *
    * @param Request $request
    * @return NULL
    */
    public function mailRegister(Request $request) {

      $rules = [
        'email' => 'unique:users'
      ];

      $err_msg = [
        // 'email.required' => 'メールアドレスを入力してください',
        // 'email.email'    => '正しいメールアドレスを入力してください',
        'email.unique'   => 'そのメールアドレスはすでに使われています'
      ];

      //バリデーションの確認
      $validator = Validator::make($request->all(), $rules, $err_msg);
      //エラーの場合
      // if ($validator->fails()) {
      //   return redirect_with_session(route('mail-register'))
      //     ->withErrors($validator)
      //     ->withInput();
      // }

      if ($validator->fails()) {
        $response['errors'] = $validator->errors()->toArray();
        throw new HttpResponseException(response()->json($response, 422));
      }

      //DBに登録する値の設定
      $user_id = uniqid(rand(1,999));
      $email = $request->email;
      $token = hash('sha256',uniqid(rand(),1));

      //DBに登録
      $user = new User;
      $user->user_id = $user_id;
      $user->email   = $email;
      $user->token = $token;
      $user->save();

      $url = 'http://localhost:8080/board/user-register'.'?urltoken='.$token;

      Mail::send(new SendMail($user_id, $email, $url));
      return NULL;
    }

    /**
    * ユーザの登録画面の表示
    * @param Request $request
    * @return NULL
    */
    public function showUserRegister(Request $request) {
      $urltoken = $request->urltoken;

      $user = new User;
      $get_user = $user->where('token', $urltoken)->first();

      if (empty($get_user)) {
        throw new HttpResponseException(response()->json(['errors' => '無効なURLです。メールに記載されたURLと同じかどうかを確認してください。または、もう一度登録をやり直してください。'], 403));
      }
      if ($get_user->flag == 1) {
        throw new HttpResponseException(response()->json(['errors' => 'すでにユーザー情報が登録済みのURLです。'], 403));
      }

      // メール送信後24時間以上経過していないか確認
      $check_token = $get_user->whereRaw('created_at > NOW() - INTERVAL 1 DAY');
      $user_id = $check_token->value('user_id');
      $email = $check_token->value('email');

      if (empty($user_id)) {
        throw new HttpResponseException(response()->json(['errors' => '有効期限切れのため、このURLはご利用できません。もう一度登録をやりなおして下さい。'], 401));
      }
      
      session(['user_id' => $user_id, 'email' => $email, 'urltoken' => $urltoken]);
      return NULL;
    }

    /**
    * ユーザー情報をDBに登録
    *
    * @param Request $request
    * @return NULL
    */
    public function complete(Request $request)
    {
      $user = User::where('token', session('urltoken'))->first();
      $user->name = $request->name;
      $user->password = $request->password;
      $user->flag = 1;
      $user->save();
      return NULL;
    }

    /**
    * ユーザ認証
    *
    * @param  Request $request
    * @return NULL
    */
    public function login(Request $request)
    {
      $post_email = $request->email;
      $post_password = $request->password;

      $user = User::where('email', $post_email)->first();
      if((empty($user)) or (strcmp($post_password, $user->password)!=0 or $user->flag == 0)) {
        throw new HttpResponseException(response()->json(['errors' => 'メールアドレスまたはパスワードが違います'], 401));
      }

      $user_id = $user->user_id;
      $name = $user->name;
      session(['name' => $name, 'user_id' => $user_id]);
      return NULL;
    }
}
