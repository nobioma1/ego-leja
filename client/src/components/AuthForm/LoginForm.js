import { Button, InputRightElement } from '@chakra-ui/core';
import React, { useState, useContext } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { InputField } from 'components/Shared';
import { useRequest } from 'hooks/useRequest';
import { AuthContext } from 'context/AuthContext';

const LoginFormSchema = Yup.object().shape({
  email: Yup.string().email('email is invalid').required('email is required'),
  password: Yup.string().required('password is required'),
});

export const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { setLogin } = useContext(AuthContext);
  const { doRequest, errors } = useRequest({
    method: 'post',
    url: '/api/users/signin',
  });

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={LoginFormSchema}
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(true);
        await doRequest({
          values,
          onSuccess: (user) => {
            setSubmitting(false);
            setLogin(user);
          },
        });
      }}
    >
      {(props) => (
        <form onSubmit={props.handleSubmit}>
          {errors}
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
          <Button
            type="submit"
            variantColor="green"
            size="lg"
            width="full"
            isLoading={props.isSubmitting}
          >
            Sign In
          </Button>
        </form>
      )}
    </Formik>
  );
};
