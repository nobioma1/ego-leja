import React from 'react';
import { Flex, Box, Image } from '@chakra-ui/core';
import { IoIosMenu } from 'react-icons/io';

import { Search } from 'components/Search';
import { Notification } from 'components/Notification';

import logo from 'assets/logo.svg';
export const TopBar = ({ onClick }) => {
  return (
    <Flex
      alignItems="center"
      borderBottomWidth="1px"
      borderBottomColor="gray.200"
      h="fit-content"
      justifyContent="space-between"
      pb={4}
      px={2}
      w="100%"
    >
      <Image
        src={logo}
        alt="Credit logo"
        h={8}
        mr={2}
        display={['block', 'block', 'none']}
      />
      <Box w={['65%', '65%', '95%']}>
        <Search />
      </Box>
      <Box w="fit-content">
        <Notification />
      </Box>
      <Box
        as={IoIosMenu}
        display={['block', 'block', 'none']}
        onClick={onClick}
        cursor="pointer"
        size={10}
      />
    </Flex>
  );
};
