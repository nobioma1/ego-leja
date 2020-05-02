import { theme } from '@chakra-ui/core';

// Let's say you want to add custom colors
export const customTheme = {
  ...theme,
  fonts: {
    ...theme.fontSizes,
    body: 'Lato, sans-serif',
  },
};
