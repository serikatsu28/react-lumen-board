<?php

/** @var \Laravel\Lumen\Routing\Router $router */

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

//初期のルート
// $router->get('/', function () use ($router) {
//     return $router->app->version();
// });

// 時間を確認
$router->get('/time', function () {
    echo Carbon\Carbon::now();
});

// PHPの設定を確認
$router->get('/info', function(){
  return view('info');
});

//セッションのテスト
$router->get('/session', function (\Illuminate\Http\Request $request) {

    $counter = $request->session()->get('counter') ?: 0;
    $request->session()->put('counter', ++$counter);

    return response()->json([
        'session.counter' => $request->session()->get('counter')
    ]);
});

//ルーティングはReact側で行う
$router->get('/board', function(){
  return view('main');
});
$router->group(['prefix' => 'board'], function () use ($router) {
  $router->get('{any}', function () {
      return view('main');
    });
});

//ユーザー登録画面
$router->post('/show-user-register', 'UserController@showUserRegister');
$router->post('/mail-register', 'UserController@mailRegister');
$router->post('/complete', 'UserController@complete');
$router->post('/login', 'UserController@login');

//コメント投稿画面
$router->get('/get-user', 'CommentController@getUserInfo');
$router->get('/get', 'CommentController@get');
$router->post('/add', 'CommentController@add');
$router->post('/delete', 'CommentController@delete');
$router->post('/edit', 'CommentController@edit');
$router->get('/get-session-flag', 'CommentController@getSessionFlag');
$router->post('/logout', 'CommentController@logout');
