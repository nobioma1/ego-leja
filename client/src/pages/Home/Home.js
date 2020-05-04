import React from 'react';
import { Box, Flex } from '@chakra-ui/core';

import { HomeRoute } from 'components/Routes';
import { Sidebar } from 'components/Sidebar';
import { TopBar } from 'components/TopBar';

export const Home = () => {
  return (
    <Box h="100%" position="absolute" w="100%">
      <Flex>
        <Box display={['none', 'block']} h="100vh" w={['70%', '350px']}>
          <Sidebar />
        </Box>
        <Box h="100vh" w={['100%', '75%']} p={3}>
          <Box px={10}>
            <TopBar />
          </Box>
          <HomeRoute />
        </Box>
      </Flex>
    </Box>
  );
};
