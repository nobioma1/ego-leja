import { Flex, Box, Text } from '@chakra-ui/core';
import React from 'react';
import { MdExitToApp } from 'react-icons/md';

import { Header } from './Header';
import { Nav } from './Nav';
import { User } from './User';

export const Sidebar = () => {
  return (
    <Flex
      borderWidth="1px"
      borderLeftColor="Gray.500"
      direction="column"
      h="100%"
      px={10}
      py={5}
      w="100%"
    >
      <Header />
      <User />
      <Nav />
      <Flex alignItems="center" bottom="0" cursor="pointer">
        <Box as={MdExitToApp} size="30px" color="green.400" mr={3} />
        <Text fontSize="md">Logout</Text>
      </Flex>
    </Flex>
  );
};
