import React from 'react';
import { Box, Text, Flex } from '@chakra-ui/core';

export const HomeContentLayout = ({ children, title }) => {
  return (
    <Box>
      <Flex alignItems="center" justifyContent="space-between" py={3}>
        <Text fontSize="2xl" fontWeight="bold">
          {title}
        </Text>
      </Flex>
      <Box h="86vh" overflowY="auto">
        {children}
      </Box>
    </Box>
  );
};
