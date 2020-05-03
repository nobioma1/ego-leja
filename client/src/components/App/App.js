import { CSSReset, Box } from '@chakra-ui/core';
import React from 'react';

import { ThemeProvider } from 'components/Theme';
import { AppRoute } from 'components/Routes';

export const App = () => {
  return (
    <ThemeProvider>
      <CSSReset />
      <Box>
        <AppRoute />
      </Box>
    </ThemeProvider>
  );
};
