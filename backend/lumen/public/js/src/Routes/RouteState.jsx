import React,{ useState, createContext, useContext } from 'react';

const RouteContext = createContext({
  routeState: '',
  setRouteState: () => {}
});

export const RouteProvider = (props) => {
  const{ children } = props;
  const[routeState, setRouteState] = useState('user_register');
  return (
    <RouteContext.Provider value={{ routeState, setRouteState }}>
      {children}
    </RouteContext.Provider>
  )
}

export const useRouteContext = () => useContext(RouteContext);
