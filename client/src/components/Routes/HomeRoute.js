import React from 'react';
import { Route, useRouteMatch } from 'react-router-dom';

import { Dashboard } from 'components/Dashboard';
import { Profile } from 'components/Profile';
import { Transactions } from 'components/Transactions';
import { Box } from '@chakra-ui/core';

export const HomeRoute = () => {
  const { url } = useRouteMatch();
  return (
    <Box pt={7} px={[0, 0, 10]}>
      <Route path={`${url}/`} component={Dashboard} exact />
      <Route path={`${url}/profile`} component={Profile} />
      <Route path={`${url}/transactions`} component={Transactions} />
    </Box>
  );
};
