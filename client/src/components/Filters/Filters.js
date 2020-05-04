import React from 'react';
import { Flex, Box, Button, Text, Select } from '@chakra-ui/core';
import { MdFilterList } from 'react-icons/md';

export const Filters = ({ filters, isActive, setActive }) => {
  return (
    <Flex direction={['column', 'column', 'row']} pb={3}>
      <Flex alignItems="center" mr={3}>
        <Box as={MdFilterList} size={8} mr={1} />
        <Text>Filters</Text>
      </Flex>
      <Flex justifyContent="space-between" wrap my={[2, 2, 0]} mx={[0, 0, 2]}>
        {filters.map((filter, index) => (
          <Button
            key={`${filter}-${index}`}
            size="sm"
            variantColor="green"
            variant={index === isActive ? 'solid' : 'outline'}
            onClick={() => setActive(index)}
            mx={[0, 0, 2]}
          >
            {filter}
          </Button>
        ))}
      </Flex>
      <Flex alignItems="center">
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
