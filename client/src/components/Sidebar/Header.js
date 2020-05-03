import React from 'react';
import { Flex, Image, Text } from '@chakra-ui/core';

import logo from 'assets/logo.svg';

export const Header = () => {
  return (
    <Flex alignItems="center" cursor="pointer">
      <Image src={logo} alt="Credit logo" h={12} mr={2} />
      <Text as="h1" fontWeight="bold" fontSize="2xl">
        credit
      </Text>
    </Flex>
  );
};
