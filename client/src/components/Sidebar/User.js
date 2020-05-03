import React from 'react';
import { Flex, Box, Text } from '@chakra-ui/core';

export const User = () => {
  return (
    <Box ml={1}>
      <Flex justifyContent="center" direction="column" h="200px">
        <Text>Account Name</Text>
        <Text fontSize="xl" fontWeight="bold" opacity="0.9">
          Mr. John Doe
        </Text>
      </Flex>
    </Box>
  );
};
