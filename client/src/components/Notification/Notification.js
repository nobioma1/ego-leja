import React from 'react';
import { Icon, Box } from '@chakra-ui/core';

export const Notification = () => {
  return (
    <Box cursor="pointer">
      <Icon name="bell" size={8} color="gray.600" />
    </Box>
  );
};
