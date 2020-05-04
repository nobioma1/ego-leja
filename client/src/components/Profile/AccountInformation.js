import React, { useState } from 'react';
import { Alert, AlertIcon, Text, Button, Box, Flex } from '@chakra-ui/core';

import { AccountInformationForm } from './AccountInformationForm';
import { AccordionLayout } from 'components/Shared';

export const AccountInformation = () => {
  const [isEdit, setIsEdit] = useState(false);

  return (
    <AccordionLayout title="Account Information" defaultIsOpen={true}>
      <Alert status="warning">
        <Flex
          w="full"
          justifyContent={['center', 'center', 'space-between']}
          alignItems={['space-between', 'space-between', 'center']}
          direction={['column', 'column', 'row']}
        >
          <Text>
            <AlertIcon /> Account is not verified
          </Text>
          <Button
            variant="outline"
            variantColor="green"
            size="sm"
            mt={[2, 2, 0]}
          >
            Resend Verification Email
          </Button>
        </Flex>
      </Alert>
      <Box my={3}>
        <Flex justifyContent="space-between" alignItems="center">
          <Text textDecoration="underline" fontSize="lg">
            User Details
          </Text>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEdit(!isEdit)}
          >
            {isEdit ? 'Cancel' : 'Edit Details'}
          </Button>
        </Flex>
        {isEdit ? (
          <AccountInformationForm />
        ) : (
          <>
            <Flex my={2} justifyContent="space-between">
              <Text pr={2}>Country: </Text>
              <Text>not set</Text>
            </Flex>
            <Flex my={2} justifyContent="space-between">
              <Text pr={2}>State: </Text>
              <Text>not set</Text>
            </Flex>
          </>
        )}
      </Box>
    </AccordionLayout>
  );
};
