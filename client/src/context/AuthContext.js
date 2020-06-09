import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { getSessionCookie, clearSession, setSessionCookie } from 'utils';
import { useRequest } from 'hooks/useRequest';

export const AuthContext = React.createContext();

export const AuthContextProvider = ({ children }) => {
  const [isAuthenticated, setAuthentication] = useState(getSessionCookie());
  const history = useHistory();

  const { doRequest } = useRequest({
    method: 'post',
    url: '/api/users/signout',
  });

  const setLogin = (user) => {
    setSessionCookie(user.id);
    setAuthentication(getSessionCookie());
    history.push('/home');
  };

  const logout = () => {
    doRequest({
      onSuccess: () => {
        clearSession();
      },
    });
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, logout, setLogin }}>
      {children}
    </AuthContext.Provider>
  );
};
