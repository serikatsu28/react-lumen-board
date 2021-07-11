import React from "react";
import { Route, Redirect } from "react-router-dom";

import { useRouteContext } from './RouteState';

export function NewEntryRoute(props) {
  const { routeState, setRouteState } = useRouteContext();

  return routeState == 'new_entry' ? <Route {...props} /> : <Redirect to="/board/login" />;
}
