import React from 'react';
import { Route, useRouteMatch } from 'react-router-dom';

import { Dashboard } from 'pages/Home/Dashboard';
import { Notes, Note } from 'pages/Home/Notes';
import { AllNotifications } from 'pages/Home/Notifications';
import { Profile } from 'pages/Home/Profile';

export const HomeRoute = () => {
  const { url } = useRouteMatch();

  return (
    <>
      <Route path={`${url}/`} component={Dashboard} exact />
      <Route path={`${url}/profile`} component={Profile} />
      <Route path={`${url}/notes`} component={Notes} exact />
      <Route path={`${url}/notes/:recId`} component={Note} />
      <Route path={`${url}/notifications`} component={AllNotifications} />
    </>
  );
};
