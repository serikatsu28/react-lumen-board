# Dockerを用いたReact + Lumenの掲示板

## 概要
Dockerを使ってローカルの環境内で簡易的な掲示板を作成

**フロント部分** : JavaScriptライブラリの[React](https://ja.reactjs.org/)

**バックエンド部分** : Laravelをベースとしたマイクロフレームワークの[Lumen](https://lumen.laravel.com/)

**使用したDockerImage**
 
・ php7.4_apache

・ mysql:8.0

・ phpmyadmin

ReactのJSXファイルをLumen側で読み込ませるために[webpack](https://ics.media/entry/16028/#webpack-babel-react)を使用

(backend/lumen/public/js/src配下に書いたJSXファイルをbuildしたものをLumenのmain.blade.phpで読み込む)

## 実装した機能

<img width="997" alt="スクリーンショット 2021-07-11 0 59 36" src="https://user-images.githubusercontent.com/73343411/125169137-c393c800-e1e3-11eb-873f-2aa799381f0d.png">


・ ユーザーのログイン/ログアウト機能

・ 新規のユーザー登録時にはメール認証を行う

・ 自分が投稿したコメントは編集と削除が可能

・ メールが送信されるまでの間、ログインして掲示板画面が表示されるまでの間は「ロード中」の画面が出る

## DEMO

##### 新規ユーザー登録とメール送信

![ezgif com-gif-maker](https://user-images.githubusercontent.com/73343411/125170087-24bd9a80-e1e8-11eb-94a2-89f0f14997cd.gif)

##### ユーザー情報の登録、ログイン、コメント、ログアウト

![ezgif com-gif-maker (1)](https://user-images.githubusercontent.com/73343411/125171425-29d21800-e1ef-11eb-9ee6-ef0d8b9894be.gif)

Dockerがあれば

「Download ZIP」からファイルをダウンロード

↓

backend/lumen配下に下記の.envファイルを追加

↓

APP_KEYとメール関係の部分を自分の設定に変更

↓

buildとコンテナの立ち上げ

```
$ docker-compose build
$ docker-compose up -d
```

↓

http://localhost:8080/board/login にアクセス

## .envファイルの設定

```.env
APP_NAME=Lumen
APP_ENV=local
APP_KEY=your_app_key
APP_DEBUG=true
APP_URL=http://localhost
APP_TIMEZONE=Asia/Tokyo

LOG_CHANNEL=stack
LOG_SLACK_WEBHOOK_URL=

DB_CONNECTION=mysql
DB_HOST=mysql
DB_PORT=3306
DB_DATABASE=lumen_db
DB_USERNAME=dbuser
DB_PASSWORD=dbpass

CACHE_DRIVER=file
QUEUE_CONNECTION=sync

MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=your_mailaddress
MAIL_PASSWORD=your_password
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=your_mailaddress
MAIL_FROM_NAME="your_mail_name"
```

