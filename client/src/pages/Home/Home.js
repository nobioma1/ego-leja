import React, { useState } from 'react';
import { Box, Flex } from '@chakra-ui/core';

import { HomeRoute } from 'components/Routes';
import { Sidebar } from 'components/Sidebar';
import { TopBar } from 'components/TopBar';

export const Home = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Flex>
      <Box
        position={isOpen ? 'fixed' : 'static'}
        left="0"
        display={isOpen ? 'block' : ['none', 'none', 'block']}
        h={['100%', '100%', '100vh']}
        w={['70%', '70%', '350px']}
        backgroundColor="white"
        zIndex="popover"
      >
        <Sidebar />
      </Box>
      <Box h="100vh" w={['100%', '100%', '75%']} p={3}>
        <Box px={[1, 1, 10]}>
          <TopBar onClick={() => setIsOpen(!isOpen)} />
        </Box>
        <Box h={['92%', '92%', 'auto']} overflowY="auto">
          <HomeRoute />
        </Box>
      </Box>
    </Flex>
  );
};
