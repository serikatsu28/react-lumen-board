import React, { useState } from "react";
import axios from 'axios';
import { useForm } from "react-hook-form";

import { SendMail } from './SendMail';
import { Loading } from '../components/Loading';

export const MailRegister = () => {
  const { register, handleSubmit, formState:{ errors } } = useForm();
  const [confirm, setConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const onSubmit = data => {
    setIsLoading(true);
    axios.post("http://localhost:8080/mail-register", {email: data.email})
    .then(() => {
      setConfirm(true);
    })
    .catch(function(e) {
      console.log(e.response.data.errors.email);
      setError(e.response.data.errors.email);
    })
    .finally(() => {
      setIsLoading(false);
    })
  }

  return (
    <div className="form-container">
      <div className="form">
        <div className="title">新規登録フォーム</div>
        {isLoading
          ? <Loading message="メール送信中..." /> :
          confirm
          ? <SendMail /> :
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-item">
              <label htmlFor="email">メールアドレス</label>
              <input id="email" type="text" {...register("email",{
                required: true,
                pattern: /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/
              })}
              />
              {errors.email && errors.email.type === "required" && (
                <div className="error">必須項目です</div>
              )}
              {errors.email && errors.email.type === "pattern" && (
                <div className="error">正しいメールアドレスを入力してください</div>
              )}
              <div className="error">{error}</div>
            </div>
            <button type="submit">登録</button>
          </form>
        }
      </div>
    </div>
  );
};
