import React, { useState, useEffect }from 'react';
import axios from 'axios';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { Header } from './Header';
import { Modal } from './Modal';

export const Board = () => {

  const [userInfo, setUserInfo] = useState([]);
  const [data, setData] = useState([]);
  const reversedData = [...data].reverse();
  const [post, setPost] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState({id: '', comment: ''});
  const { register, handleSubmit, reset, formState:{ errors } } = useForm();

  useEffect(() => {
    axios.get("http://localhost:8080/get-user")
    .then((res) => {
      console.log(res.data);
      setUserInfo(res.data);
    })
    .catch(() => {
      alert("ユーザー情報の読み込みに失敗しました。")
    })
  }, []);

  const onSubmit = (data, e) => {
    console.log(data);
    axios.post("http://localhost:8080/add", {
      comment: data.comment
    })
    .then(() => {
      console.log('ok');
      console.log(data.comment);
      reset({comment: ""});
      setPost(true);
    })
    .catch(() => {
      alert("コメントの投稿に失敗しました");
    })
  }

  const onClickEdit = (id,comment) => {
    setEditData({id: id, comment: comment});
    setShowModal(true);
  }

  const onClickDelete = (id) => {
    if (!window.confirm('コメントを削除しますか？')){
      return false;
    }
    axios.post("http://localhost:8080/delete", {
      id: id
    })
    .then((res) => {
      setPost(true);
    })
    .catch(() => {
      alert("コメントの削除に失敗しました");
    })
  }

  const modalProps = {
    editData : editData,
    setShowModal :setShowModal,
    setPost : setPost
  }

  if (post == true) {
    setPost(false);
    axios.get("http://localhost:8080/get")
    .then((res) => {
      setData(res.data);
    })
    .catch(() => {
      alert("コメントの読み込みに失敗しました");
    })
  }

  return (
    <div className="board-container">
      <div className="back-ground">
        <Header name={userInfo[0]} />
        <main role="main">
        {showModal ? <Modal {...modalProps} /> : null}
        <div className="content submit-comment">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label htmlFor="comment">コメント</label>
              <textarea id="comment" {...register("comment", { required: true })} />
              {errors.comment && (<div className="error">必須項目です</div>)}
            </div>
            <button type="submit">投稿</button>
          </form>
        </div>
        <div className="content">
          {reversedData.map((item, index) => {
            return (
              <div key={index} className="board-item">
                {item.delete_flag==0 ? (
                  <div>
                    <div className="board-item-name">{item.id} : {item.name} <span className="board-item-date">{moment(item.updated_at).format('YYYY/MM/DD HH:mm:ss')}</span></div>
                    <div className="board-item-comment">{item.comment}</div>
                    <div className="board-item-btn">
                      {item.user_id==userInfo[1] && (<button onClick={() => onClickEdit(item.id, item.comment)} className="change-btn">編集</button>)}
                      {item.user_id==userInfo[1] && (<button onClick={() => onClickDelete(item.id)} className="change-btn">削除</button>)}
                    </div>
                  </div>
                ):(
                  <div className="board-item-name">{item.id} :<span className="board-item-delete">削除されました</span></div>
                )}
              </div>
            );
          })}
        </div>
        </main>
      </div>
    </div>
  );
};
