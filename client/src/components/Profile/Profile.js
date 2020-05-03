import React from 'react';
import { Text, Box, Flex, Accordion } from '@chakra-ui/core';

import { ChangePassword } from './ChangePassword';
import { DeleteAccount } from './DeleteAccount';
import { User } from './User';
import { AccountInformation } from './AccountInformation';

export const Profile = () => {
  return (
    <Box w="100%" h="90vh" overflowY="auto">
      <Flex direction="column" w="2xl">
        <Flex alignItems="center" justifyContent="space-between" py={2}>
          <Text fontSize="xl" fontWeight="bold">
            Profile
          </Text>
        </Flex>
        <User />
        <Accordion allowToggle>
          <AccountInformation />
          <ChangePassword />
          <DeleteAccount />
        </Accordion>
      </Flex>
    </Box>
  );
};
