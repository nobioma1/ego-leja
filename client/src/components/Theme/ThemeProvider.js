import React from 'react';
import { ThemeProvider as Provider } from '@chakra-ui/core';

import { customTheme } from './theme';

export const ThemeProvider = ({ children }) => (
  <Provider theme={customTheme}>{children}</Provider>
);
