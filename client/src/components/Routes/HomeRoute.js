import React from 'react';
import { Route, useRouteMatch } from 'react-router-dom';

import { Dashboard } from 'pages/Home/Dashboard';
import { Profile } from 'pages/Home/Profile';
import { Transactions, Transaction } from 'pages/Home/Transactions';

export const HomeRoute = () => {
  const { url } = useRouteMatch();

  return (
    <>
      <Route path={`${url}/`} component={Dashboard} exact />
      <Route path={`${url}/profile`} component={Profile} />
      <Route path={`${url}/transactions`} component={Transactions} exact />
      <Route path={`${url}/transactions/:recId`} component={Transaction} />
    </>
  );
};
