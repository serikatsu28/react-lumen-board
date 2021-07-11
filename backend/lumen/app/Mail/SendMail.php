<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class SendMail extends Mailable
{
    use Queueable, SerializesModels;

    protected $user_id;
    protected $email;
    protected $token;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($user_id, $email, $url)
    {
        $this->user_id = $user_id;
        $this->email   = $email;
        $this->url   = $url;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->to(['email' => $this->email])
        ->subject('[掲示板]本登録の案内') //件名
        ->view('text') //メッセージの内容
        ->with([
          'user_id' => $this->user_id,
          'url'   => $this->url,
        ]);
    }
}
