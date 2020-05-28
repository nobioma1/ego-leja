import React, { useState } from 'react';
import { Text, Button, Flex, Divider } from '@chakra-ui/core';

import { AccountInformationForm } from './AccountInformationForm';
import { AccordionLayout } from 'components/Shared';

export const AccountInformation = () => {
  const [isEdit, setIsEdit] = useState(false);

  return (
    <AccordionLayout title="Account Information" defaultIsOpen={true}>
      <Flex justifyContent="space-between" alignItems="center">
        <Text fontSize="lg" fontWeight="bold">
          Your Account Details
        </Text>
        <Button variant="outline" size="sm" onClick={() => setIsEdit(!isEdit)}>
          {isEdit ? 'Cancel' : 'Edit Details'}
        </Button>
      </Flex>
      {isEdit ? (
        <AccountInformationForm />
      ) : (
        <>
          <Flex my={3} justifyContent="space-between">
            <Text pr={2} fontWeight="bold">
              Country:{' '}
            </Text>
            <Text>not set</Text>
          </Flex>
          <Divider />
          <Flex my={3} justifyContent="space-between">
            <Text pr={2} fontWeight="bold">
              State:{' '}
            </Text>
            <Text>not set</Text>
          </Flex>
        </>
      )}
    </AccordionLayout>
  );
};
