import { CSSReset } from '@chakra-ui/core';
import React from 'react';

import { ThemeProvider } from 'components/Theme';

export const App = () => {
  return (
    <ThemeProvider>
      <CSSReset />
    </ThemeProvider>
  );
};
