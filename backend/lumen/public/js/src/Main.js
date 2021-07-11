import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { Login } from './login_board/Login';
import { Board } from './login_board/Board';
import { MailRegister } from './mail_register/MailRegisterForm';
import { UserRegister } from './user_register/UserRegisterForm';
import { LoggedInRoute } from './Routes/LoggedInRoute';
import { NewEntryRoute } from './Routes/NewEntryRoute';
import { UserRegisterRoute } from './Routes/UserRegisterRoute';
import { RouteProvider } from './Routes/RouteState';
import './styles.css';

const Main = () => {
  return (
    <RouteProvider>
      <BrowserRouter>
        <Switch>
          <LoggedInRoute exact path="/board" children={<Board />} />
          <NewEntryRoute path="/board/mail-register" children={<MailRegister />} />
          <UserRegisterRoute path="/board/user-register" children={<UserRegister />} />
          <Route path="/board/login" children={<Login />} />
        </Switch>
      </BrowserRouter>
    </RouteProvider>
  );
};

ReactDOM.render(<Main />, document.getElementById("main"));
