import React from 'react';

export const SendMail = () => {
  return(
    <div className="message">
      仮登録が完了しました。<br />
      登録されたメールアドレスにユーザーIDと本登録用のURLを記載したメールを送ります。<br />
      ２４時間以内に記載されたURLから本登録をしてください。
    </div>
  );
};
