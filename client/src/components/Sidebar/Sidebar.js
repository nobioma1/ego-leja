import { Flex, Box, Text } from '@chakra-ui/core';
import React, { useContext } from 'react';
import { MdExitToApp } from 'react-icons/md';

import { Header } from './Header';
import { Nav } from './Nav';
import { User } from './User';
import { AuthContext } from 'context/AuthContext';

export const Sidebar = () => {
  const { logout } = useContext(AuthContext);

  return (
    <Flex
      borderRightColor="Gray.500"
      borderRightWidth="1px"
      direction="column"
      h="100%"
      px={10}
      py={5}
      w="100%"
    >
      <Header />
      <User />
      <Nav />
      <Flex alignItems="center" bottom="0" cursor="pointer" onClick={logout}>
        <Box as={MdExitToApp} size="30px" color="green.400" mr={3} />
        <Text fontSize="md">Logout</Text>
      </Flex>
    </Flex>
  );
};
