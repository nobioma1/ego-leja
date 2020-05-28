import React from 'react';
import { Flex, Accordion } from '@chakra-ui/core';

import { ChangePassword } from 'components/Profile/ChangePassword';
import { DeleteAccount } from 'components/Profile/DeleteAccount';
import { User } from 'components/Profile/User';
import { AccountInformation } from 'components/Profile/AccountInformation';
import { HomeContentLayout } from 'components/Layout';

export const Profile = () => {
  return (
    <HomeContentLayout title="Profile">
      <Flex direction="column" w="full">
        <User />
        <Accordion allowToggle>
          <AccountInformation />
          <ChangePassword />
          <DeleteAccount />
        </Accordion>
      </Flex>
    </HomeContentLayout>
  );
};
