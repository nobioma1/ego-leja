import React from 'react';
import { Box, Flex } from '@chakra-ui/core';

import { HomeRoute } from 'components/Routes';
import { Sidebar } from 'components/Sidebar';
import { TopBar } from 'components/TopBar';

export const Home = () => {
  return (
    <Flex>
      <Box
        display={['none', 'none', 'block']}
        h="100vh"
        w={['70%', '70%', '350px']}
      >
        <Sidebar />
      </Box>
      <Box h="100vh" w={['100%', '100%', '75%']} p={3}>
        <Box px={[1, 1, 10]}>
          <TopBar />
        </Box>
        <Box>
          <HomeRoute />
        </Box>
      </Box>
    </Flex>
  );
};
