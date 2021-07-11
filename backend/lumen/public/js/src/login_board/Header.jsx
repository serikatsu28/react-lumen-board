import React from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import { useRouteContext } from '../Routes/RouteState';

export const Header = (props) => {
  const history = useHistory();
  const { routeState, setRouteState } = useRouteContext();
  const logout = () => {
    if (!window.confirm('本当にログアウトしますか？')){
      return false;
    }
    axios.post("http://localhost:8080/logout", {})
    .then(() => {
      setRouteState('user_register');
      history.push('/board/login');
    })
    .catch(() => {
      alert("ログアウトに失敗しました");
    })
  }

  return(
    <header>
      <div className="header-title">掲示板</div>
      <ul className="header-list">
        <li className="header-list-item" >ようこそ{props.name}さん</li>
        <li className="header-list-item">
          <button onClick={logout} className="logout-btn">ログアウト</button>
        </li>
      </ul>
    </header>
  );
};
