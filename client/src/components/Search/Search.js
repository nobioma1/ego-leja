import React from 'react';
import { InputGroup, InputLeftElement, Icon, Input } from '@chakra-ui/core';

export const Search = () => {
  return (
    <InputGroup w="100%">
      <InputLeftElement
        color="gray.500"
        fontSize="1.2em"
        children={<Icon name="search" />}
      />
      <Input placeholder="Search" border="none" />
    </InputGroup>
  );
};
