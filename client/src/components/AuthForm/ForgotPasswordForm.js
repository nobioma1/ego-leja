import React from 'react';
import { Button, Text } from '@chakra-ui/core';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { InputField } from 'components/Shared';

const forgetPasswordSchema = Yup.object().shape({
  email: Yup.string().email('email is invalid').required('email is required'),
});

export const ForgotPasswordForm = () => {
  return (
    <>
      <Text fontSize="md" textAlign="center">
        Enter your email address and we’ll send you a link to reset your
        password.
      </Text>
      <Formik
        initialValues={{ email: '' }}
        validationSchema={forgetPasswordSchema}
        onSubmit={(values, actions) => {
          console.log('submitted');
        }}
      >
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            <InputField
              type="email"
              name="email"
              label="Email Address"
              placeholder="joe@email.co"
            />
            <Button type="submit" variantColor="green" size="lg" width="full">
              Send Reset Password Link
            </Button>
          </form>
        )}
      </Formik>
    </>
  );
};
