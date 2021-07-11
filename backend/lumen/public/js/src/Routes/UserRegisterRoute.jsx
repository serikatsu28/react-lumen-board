import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Route, useLocation } from "react-router-dom";

import { useRouteContext } from './RouteState';
import { TokenError } from '../user_register/TokenError';

export function UserRegisterRoute(props) {
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const { routeState, setRouteState } = useRouteContext();
  const [error, setError] = useState();

  useEffect(() => {
    axios.post("http://localhost:8080/show-user-register", {
      urltoken: query.get("urltoken"),
    })
    .then(() => {
      console.log("then");

    })
    .catch(function(e) {
      console.log(e.response.data.errors);
      setRouteState('none');
      setError(e.response.data.errors);
    })
  }, []);
  console.log("return");
  return routeState == 'user_register' ? <Route {...props} /> : <TokenError error={error} />;
}
