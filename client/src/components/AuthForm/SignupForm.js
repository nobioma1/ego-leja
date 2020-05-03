import React, { useState } from 'react';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';

import { InputField } from 'components/Shared';
import {
  InputRightElement,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Select,
} from '@chakra-ui/core';

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

  return (
    <Formik
      initialValues={{
        fullName: '',
        email: '',
        password: '',
      }}
      validationSchema={SignupSchema}
      onSubmit={(values, actions) => {
        console.log('submitted');
      }}
    >
      {(props) => (
        <form onSubmit={props.handleSubmit}>
          <Field name="title">
            {({ field, form }) => (
              <FormControl
                isInvalid={form.errors[field.name] && form.touched[field.name]}
              >
                <FormLabel htmlFor={field.name}>Title</FormLabel>
                <Select {...field} id={field.name} placeholder="select a title">
                  <option value="Mr.">Mr.</option>
                  <option value="Mrs.">Mrs.</option>
                  <option value="Miss.">Miss.</option>
                </Select>
                <FormErrorMessage>{form.errors[field.name]}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
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

          <Button type="submit" variantColor="green" size="lg" width="full">
            Sign Up
          </Button>
        </form>
      )}
    </Formik>
  );
};
