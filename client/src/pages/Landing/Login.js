import React, { useState } from 'react';
import { Button } from '@chakra-ui/core';

import { Modal } from 'components/Modal';
import { ForgotPasswordForm } from 'components/AuthForm/ForgotPasswordForm';
import { LoginForm } from 'components/AuthForm/LoginForm';

export const Login = (props) => {
  const [forgotPassword, setForgotPassword] = useState(false);

  return (
    <Modal
      title={forgotPassword ? 'Forgot your Password?' : 'Log In.'}
      {...props}
    >
      {!forgotPassword ? <LoginForm /> : <ForgotPasswordForm />}
      <Button
        type="button"
        variant="ghost"
        size="lg"
        width="full"
        my={2}
        onClick={() => setForgotPassword(!forgotPassword)}
        _focus={{ outline: 'none' }}
      >
        {!forgotPassword ? 'Forgot Password?' : 'Cancel'}
      </Button>
    </Modal>
  );
};
