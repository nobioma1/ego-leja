import { Image, Flex, Button, Stack } from '@chakra-ui/core';
import React from 'react';

import logo from 'assets/logo.svg';

export const TopBar = ({ onOpenLogin, onOpenSignup }) => {
  return (
    <Flex w="full" justifyContent="space-between">
      <Image src={logo} alt="Credit logo" h={12} />
      <Stack isInline>
        <Button onClick={onOpenLogin} size="md" variant="ghost">
          Login
        </Button>
        <Button
          onClick={onOpenSignup}
          size="md"
          variantColor="green"
          variant="solid"
        >
          Create An Account
        </Button>
      </Stack>
    </Flex>
  );
};
