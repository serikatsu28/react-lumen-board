import React from 'react';

import { PageTransitionButton } from '../components/PageTransitionButton';

export const TokenError = (props) => {
  const { error } = props;

  return (
    <div className="form-container">
      <div className="form">
        <div className="title">エラーが発生しました</div>
        <div className="message">{error}</div>
        <PageTransitionButton
          state='redirect'
          route='/board/login'
          buttonName='ログイン画面へ'
        />
      </div>
    </div>
  );
};
