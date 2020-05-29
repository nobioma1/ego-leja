import React, { useContext } from 'react';
import { Box, Flex, Avatar, Text, Button } from '@chakra-ui/core';
import moment from 'moment';

import { UserContext } from 'context/UserContext';
import { NameEditable } from './NameEditable';

export const User = () => {
  const {
    state: { user },
  } = useContext(UserContext);

  return (
    <Flex my={3} py={[0, 0, 3]}>
      <Flex
        alignItems="center"
        justifyContent="center"
        w={['auto', 'auto', '25%']}
      >
        <Avatar name={user.fullName} size="2xl" />
      </Flex>
      <Flex pl={3} w={['auto', 'auto', '75%']} direction="column">
        <NameEditable fullName={user.fullName} />
        <Box mt={2}>
          <Flex alignItems="center" flexWrap="wrap" my={2}>
            <Text fontSize="xl" mr={3}>
              {user.email}
            </Text>
            <Button variant="outline" variantColor="green" size="xs">
              Verify Email
            </Button>
          </Flex>
          <Text>
            Joined:{' '}
            <Text as="span">
              {moment(user.createdAt).format('MMMM DD, YYYY')}
            </Text>
          </Text>
        </Box>
      </Flex>
    </Flex>
  );
};
