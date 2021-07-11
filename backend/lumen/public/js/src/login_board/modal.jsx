import React,{ useState , useEffect } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';

export const Modal = (props) => {
  const {editData, setShowModal, setPost} = props;
  const { register, handleSubmit, formState:{ errors } } = useForm();
  const onSubmit = (data) => {
    axios.post("http://localhost:8080/edit", {
      id: editData.id,
      edit_comment: data.comment
    })
    .then(() => {
      console.log(data.comment);
      setShowModal(false);
      setPost(true);
    })
    .catch(() => {
      alert("コメントの編集に失敗しました");
    })
  }

  return(
    <div id="overlay" onClick={() => setShowModal(false)}>
      <div id="modal-content" className="submit-comment" onClick={(e) => e.stopPropagation()}>
        <a className="close-btn" href="#" onClick={() => setShowModal(false)} >×</a>
        <form onSubmit={handleSubmit(onSubmit)}>
          <textarea id="comment" defaultValue={editData.comment} {...register("comment", { required: true })} />
          {errors.comment && (<div className="error">必須項目です</div>)}
          <button type="submit">更新</button>
        </form>
      </div>
    </div>
  );
};
