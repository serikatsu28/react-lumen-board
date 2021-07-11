<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Exceptions\HttpResponseException;

class CommentController extends Controller
{
    /**
     * ログインしたユーザー情報を取得
     *
     * @return Response
     */
    public function getUserInfo()
    {
      $user_info = [session('name'),session('user_id')];

      return $user_info;
    }

    /**
     * DBのコメントを取得
     *
     * @return Response
     */
    public function get()
    {
      $comments = Comment::select('id', 'user_id', 'name', 'comment', 'delete_flag', 'updated_at')->get();

      return response()->json($comments);
    }

    /**
     * コメントをDBに追加
     *
     * @param Request $request
     * @return NULL
     */
    public function add(Request $request)
    {
      $comments = new Comment;
      $comments->user_id = session('user_id');
      $comments->name = session('name');
      $comments->comment = $request->comment;
      $comments->save();
      return NULL;
    }

    /**
     * コメントを削除
     *
     * @param Request $request
     * @return NULL
     */
    public function delete(Request $request)
    {
      $comments = new Comment;
      $del_com = $comments->where('id', $request->id)->update([
        'delete_flag' => 1,
      ]);
    }

    /**
     * コメントを編集
     *
     * @param Request $request
     * @return NULL
     */
    public function edit(Request $request)
    {
      $comments = new Comment;
      $edit_com = $comments->where('id', $request->id)->update([
        'comment' => $request->edit_comment
      ]);
    }

    /**
    * セッションの確認
    *
    * @return Response
    */
    public function getSessionFlag()
    {
      $session_flag = session()->has('user_id');

      return response()->json($session_flag);
    }

    /**
    * ログアウト/セッションの削除
    *
    * @return NULL
    */
    public function logout()
    {
      session()->flush();

      return NULL;
    }
}
