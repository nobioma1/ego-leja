import { Image, Flex, Button, Stack } from '@chakra-ui/core';
import React from 'react';

import logo from 'assets/logo.svg';

export const TopBar = ({
  onOpenLogin,
  onOpenSignup,
  loginBtnRef,
  signUpBtnRef,
}) => {
  return (
    <Flex w="full" justifyContent="space-between">
      <Image src={logo} alt="Credit logo" h={12} />
      <Stack isInline>
        <Button
          ref={loginBtnRef}
          onClick={onOpenLogin}
          size="md"
          variant="ghost"
        >
          Login
        </Button>
        <Button
          ref={signUpBtnRef}
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
