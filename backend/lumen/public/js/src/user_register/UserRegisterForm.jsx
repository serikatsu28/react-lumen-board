import React, { useState } from "react";
import axios from 'axios';
import { useForm } from "react-hook-form";

import { Complete } from './Complete';

export const UserRegister = () => {
  const { register, handleSubmit, formState:{ errors } } = useForm();
  const [confirm, setConfirm] = useState(false);

  const onSubmit = data => {
    axios.post("http://localhost:8080/complete", {
      name: data.name,
      password: data.password
    })
    .then(() => {
      console.log("ok")
      setConfirm(true);
    })
    .catch(function(e) {
      console.log(data)
      console.log(e.response.data.errors)
    })
  }

  return (
    <div className="form-container">
      <div className="form">
      <div className="title">ユーザー登録フォーム</div>
      {confirm
        ? <Complete />
        :
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-item">
            <label htmlFor="name">名前</label>
            <input id="name" {...register("name", {
              required: true, maxLength: 20
            })}
            />
            {errors.name && errors.name.type === "required" && (
              <div className="error">必須項目です</div>
            )}
            {errors.name && errors.name.type === "maxLength" && (
              <div className="error">入力できる文字数を超えています</div>
            )}
            <ul className="form-condition">
              <li>２０文字以内</li>
            </ul>
          </div>
          <div className="form-item">
            <label htmlFor="password">パスワード</label>
            <input id="password" type="password" {...register("password",{
              required: true,
              pattern: /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)[a-zA-Z\d]{6,20}$/
            })}
            />
            {errors.password && errors.password.type === "required" && (
              <div className="error">必須項目です</div>
            )}
            {errors.password && errors.password.type === "pattern" && (
              <div className="error">条件と一致していません</div>
            )}
            <ul className="form-condition">
              <li>６文字以上２０文字以内</li>
              <li>半角英小文字、大文字、数字をそれぞれ1種類以上含む</li>
            </ul>
          </div>
        <button type="submit">登録</button>
        </form>
      }
      </div>
    </div>
  );
};
