import React from 'react';

import { PageTransitionButton } from '../components/PageTransitionButton'

export const Complete = () => {
  return(
    <div>
      ご登録ありがとうございます<br />
      掲示板はログイン後に利用できます
      <PageTransitionButton
        state='redirect'
        route='/board/login'
        buttonName='ログイン画面へ'
      />
    </div>
  );
};
