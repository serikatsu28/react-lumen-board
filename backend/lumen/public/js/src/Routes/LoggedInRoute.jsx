import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Route, Redirect } from "react-router-dom";

import { useRouteContext } from './RouteState';
import { Loading } from '../components/Loading';

export function LoggedInRoute(props) {
  const { routeState, setRouteState } = useRouteContext();
  useEffect(() => {
    axios.get("http://localhost:8080/get-session-flag")
    .then((res) => {
      res.data ? setRouteState('logged_in') : setRouteState('redirect');

      console.log(res.data);
    })
    .catch(() => {
      alert('読み込みに失敗しました')
      console.log('error');
    })
  }, []);

  if (routeState == 'logged_in') {
    return <Route {...props} />;
  }
  if (routeState == 'redirect') {
    return <Redirect to="/board/login" />;
  }
  return (
    <div className="form-container">
      <div className="form">
        <Loading message="ロード中..."/>
      </div>
    </div>
  );
}
