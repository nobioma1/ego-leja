import React, { useContext } from 'react';
import { Flex, Box, Text } from '@chakra-ui/core';

import { UserContext } from 'context/UserContext';

export const User = () => {
  const [{ user }] = useContext(UserContext);

  return (
    <Box ml={1}>
      <Flex justifyContent="center" direction="column" h="200px">
        <Text>Account Name</Text>
        <Text fontSize="xl" fontWeight="bold" opacity="0.9">
          {user.fullName}
        </Text>
      </Flex>
    </Box>
  );
};
