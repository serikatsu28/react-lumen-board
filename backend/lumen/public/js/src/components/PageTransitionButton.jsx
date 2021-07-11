import React from 'react';
import { useHistory } from 'react-router-dom';

import { useRouteContext } from '../Routes/RouteState';

export const PageTransitionButton = (props) => {
  const { state, route, buttonName } = props;
  const history = useHistory();
  const { routeState, setRouteState } = useRouteContext();

  const transition = () => {
    setRouteState(state);
    history.push(route);
  }

  return (
    <button onClick={transition}>{buttonName}</button>
  );
};
