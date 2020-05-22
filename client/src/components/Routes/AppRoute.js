import React from 'react';
import {
  Router as BrowserRouter,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import history from '../../history';
import { Home } from 'pages/Home';
import { Landing } from 'pages/Landing';
import { ProtectedRoute } from './ProtectedRoute';

export const AppRoute = () => {
  return (
    <BrowserRouter history={history}>
      <Switch>
        <Route path="/" component={Landing} exact />
        <ProtectedRoute path="/home" component={Home} />
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
};
