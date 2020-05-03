import React from 'react';
import { Box, useDisclosure, Flex } from '@chakra-ui/core';

import { HomeRoute } from 'components/Routes';
import { Sidebar } from 'components/Sidebar';
import { TopBar } from 'components/TopBar';
import { AddBorrowing, AddCredit } from 'components/Transactions';

export const Home = () => {
  const { onOpen: creditOnOpen, ...creditDisclosure } = useDisclosure();
  const { onOpen: borrowingOnOpen, ...borrowingDisclosure } = useDisclosure();

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
      <AddBorrowing disclosure={borrowingDisclosure} />
      <AddCredit disclosure={creditDisclosure} />
    </Box>
  );
};
