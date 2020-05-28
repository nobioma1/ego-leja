import React, { useState, useContext } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { InputField } from 'components/Shared';
import { InputRightElement, Button } from '@chakra-ui/core';
import { useRequest } from 'hooks/useRequest';
import { AuthContext } from 'context/AuthContext';

const SignupSchema = Yup.object().shape({
  fullName: Yup.string()
    .matches(/(\w.+\s).+/, 'firstname and lastname are required')
    .required('full name is required'),
  email: Yup.string().email('email is invalid').required('email is required'),
  password: Yup.string()
    .min(8, 'password should be minimum of 8 characters')
    .required('password is required'),
});

export const SignupForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { setLogin } = useContext(AuthContext);
  const { doRequest, errors } = useRequest({
    method: 'post',
    url: '/api/users/signup',
  });

  return (
    <Formik
      initialValues={{
        fullName: '',
        email: '',
        password: '',
      }}
      validationSchema={SignupSchema}
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
            type="text"
            name="fullName"
            label="Full Name"
            placeholder="Jane Joe"
          />
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
            Sign Up
          </Button>
        </form>
      )}
    </Formik>
  );
};
