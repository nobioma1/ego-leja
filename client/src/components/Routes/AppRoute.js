import React from 'react';
import { Router as BrowserRouter, Switch, Route } from 'react-router-dom';

import history from '../../history';
import { Home } from 'pages/Home';
import { Landing } from 'pages/Landing';

export const AppRoute = () => {
  return (
    <BrowserRouter history={history}>
      <Switch>
        <Route path="/" component={Landing} exact />
        <Route path="/home" component={Home} />
      </Switch>
    </BrowserRouter>
  );
};
