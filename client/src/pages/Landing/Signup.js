import React from 'react';

import { Modal } from 'components/Modal';
import { SignupForm } from 'components/AuthForm/SignupForm';

export const Signup = (props) => {
  return (
    <Modal title="Create an Account." {...props}>
      <SignupForm />
    </Modal>
  );
};
