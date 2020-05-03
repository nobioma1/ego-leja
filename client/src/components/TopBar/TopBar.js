import React from 'react';
import { Flex, Box } from '@chakra-ui/core';

import { Search } from 'components/Search';
import { Notification } from 'components/Notification';

export const TopBar = () => {
  return (
    <Flex
      alignItems="center"
      borderBottomWidth="1px"
      borderBottomColor="gray.200"
      h="fit-content"
      justifyContent="space-between"
      pb={4}
      w="100%"
    >
      <Box w="95%">
        <Search />
      </Box>
      <Box w="fit-content">
        <Notification />
      </Box>
    </Flex>
  );
};
