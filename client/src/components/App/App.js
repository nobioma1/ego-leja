import { CSSReset, Box } from '@chakra-ui/core';
import React from 'react';

import { ThemeProvider } from 'components/Theme';
import { AppRoute } from 'components/Routes';
import { UserContextProvider } from 'context/UserContext';

export const App = () => {
  return (
    <ThemeProvider>
      <CSSReset />
      <Box>
        <UserContextProvider>
          <AppRoute />
        </UserContextProvider>
      </Box>
    </ThemeProvider>
  );
};
