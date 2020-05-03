import React, { useState } from 'react';
import { Button, InputRightElement } from '@chakra-ui/core';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { InputField } from 'components/Shared';

const LoginFormSchema = Yup.object().shape({
  email: Yup.string().email('email is invalid').required('email is required'),
  password: Yup.string().required('password is required'),
});

export const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={LoginFormSchema}
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
            placeholder="user@email.co"
          />
          <InputField
            type={showPassword ? 'text' : 'password'}
            name="password"
            label="Password"
            placeholder="*********"
          >
            <InputRightElement width="4.5rem">
              <Button
                h="1.75rem"
                size="sm"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? 'Hide' : 'Show'}
              </Button>
            </InputRightElement>
          </InputField>
          <Button type="submit" variantColor="green" size="lg" width="full">
            Sign In
          </Button>
        </form>
      )}
    </Formik>
  );
};
