import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from "react-hook-form";
import { useHistory } from 'react-router-dom';

import { useRouteContext } from '../Routes/RouteState';
import { PageTransitionButton } from '../components/PageTransitionButton';

export const Login = () => {
  const history = useHistory();
  const [error, setError] = useState();
  const { register, handleSubmit, formState:{ errors } } = useForm();
  const { routeState, setRouteState } = useRouteContext();

  const onSubmit = data => {
    event.preventDefault();
    console.log(data);
    axios.post("http://localhost:8080/login", {
      email: data.email,
      password: data.password
    })
    .then(() => {
      setRouteState('logged_in');
      history.push("/board");
    })
    .catch(function(e) {
      console.log(e.response.data.errors);
      setError(e.response.data.errors);
    })
  }

  return (
    <div className="form-container">
      <div className="form">
      <div className="title">ログインフォーム</div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-item">
            <label htmlFor="email">メールアドレス</label>
            <input id="email" {...register("email", { required: true })} />
            {errors.email && (<div className="error">必須項目です</div>)}
          </div>
          <div className="form-item">
            <label htmlFor="password">パスワード</label>
            <input id="password" type="password" {...register("password",{ required: true })} />
            {errors.password && (<div className="error">必須項目です</div>)}
          </div>
          <div className="error">{error}</div>
          <button type="submit">ログイン</button>
          <PageTransitionButton
            state='new_entry'
            route='/board/mail-register'
            buttonName='新規登録'
          />

        </form>
      </div>
    </div>
  );
};
