import React, { useState } from 'react';
import { Text, InputRightElement, Button } from '@chakra-ui/core';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { AccordionLayout, InputField } from 'components/Shared';

const ChangePasswordSchema = Yup.object().shape({
  currentPassword: Yup.string().required('password is required'),
  newPassword: Yup.string()
    .min(8, 'password should be minimum of 8 characters')
    .required('password is required'),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref('password'), null],
    'Passwords must match'
  ),
});

export const ChangePassword = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <AccordionLayout title="Change Your Password">
      <Text fontSize="md" textAlign="center">
        Enter your current password, a new password and confirm the new password
        to change your password.
      </Text>
      <Formik
        initialValues={{
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        }}
        validationSchema={ChangePasswordSchema}
        onSubmit={(values, actions) => {
          console.log('submitted');
        }}
      >
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            <InputField
              type="password"
              name="currentPassword"
              label="Current Password"
              placeholder="*********"
            />
            <InputField
              type={showPassword ? 'text' : 'password'}
              name="newPassword"
              label="New Password"
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

            <InputField
              type="password"
              name="confirmPassword"
              label="Confirm New Password"
              placeholder="*********"
            />
            <Button
              type="submit"
              variantColor="green"
              variant="outline"
              size="lg"
              width="full"
            >
              Save Password
            </Button>
          </form>
        )}
      </Formik>
    </AccordionLayout>
  );
};
