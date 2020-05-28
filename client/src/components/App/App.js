import { CSSReset, Box } from '@chakra-ui/core';
import React from 'react';

import { ThemeProvider } from 'components/Theme';
import { AppRoute } from 'components/Routes';
import { UserContextProvider } from 'context/UserContext';
import { AuthContextProvider } from 'context/AuthContext';

export const App = () => {
  return (
    <AuthContextProvider>
      <ThemeProvider>
        <CSSReset />
        <Box>
          <UserContextProvider>
            <AppRoute />
          </UserContextProvider>
        </Box>
      </ThemeProvider>
    </AuthContextProvider>
  );
};
