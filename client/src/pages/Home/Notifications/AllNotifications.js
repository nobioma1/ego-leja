import React from 'react';

import { HomeContentLayout } from 'components/Layout';
import { Box, Text } from '@chakra-ui/core';

export const AllNotifications = () => {
  return (
    <HomeContentLayout title="Your Notifications">
      <Box>
        <Text>Your Notifications</Text>
      </Box>
    </HomeContentLayout>
  );
};
