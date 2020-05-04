import React from 'react';
import { Flex, Box, ButtonGroup, Button, Text, Select } from '@chakra-ui/core';
import { MdFilterList } from 'react-icons/md';

export const Filters = ({ filters, isActive, setActive }) => {
  return (
    <Flex alignItems="center" pb={3}>
      <Flex alignItems="center" mr={3}>
        <Box as={MdFilterList} size={8} mr={1} />
        <Text>Filters</Text>
      </Flex>
      <ButtonGroup spacing={4}>
        {filters.map((filter, index) => (
          <Button
            key={`${filter}-${index}`}
            size="sm"
            variantColor="green"
            variant={index === isActive ? 'solid' : 'outline'}
            onClick={() => setActive(index)}
          >
            {filter}
          </Button>
        ))}
      </ButtonGroup>
      <Flex alignItems="center" ml={3}>
        <Select size="sm" placeholder="Order by" _focus={{ outline: 'none' }}>
          <option value="name">Name</option>
          <option value="type">Type</option>
          <option value="amount">Amount</option>
          <option value="dueDate">Due Date</option>
          <option value="createDate">Add Date</option>
        </Select>
      </Flex>
    </Flex>
  );
};
