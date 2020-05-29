import React, { useState } from 'react';
import {
  Text,
  InputRightElement,
  Button,
  Box,
  Flex,
  useToast,
} from '@chakra-ui/core';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { AccordionLayout, InputField } from 'components/Shared';
import { useRequest } from 'hooks/useRequest';

const ChangePasswordSchema = Yup.object().shape({
  currentPassword: Yup.string().required('Current password is required'),
  newPassword: Yup.string()
    .min(8, 'New password should be minimum of 8 characters')
    .required('password is required'),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref('newPassword'), null],
    'Passwords must match'
  ),
});

export const ChangePassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const toast = useToast();
  const { doRequest, errors } = useRequest({
    method: 'post',
    url: '/api/users/change-password',
  });

  return (
    <AccordionLayout title="Change Your Password">
      <Flex direction="column" alignItems="center">
        <Text fontSize="md" textAlign="center">
          Provide your current password, and set your new password.
        </Text>
        <Formik
          initialValues={{
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
          }}
          validationSchema={ChangePasswordSchema}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            setSubmitting(true);
            await doRequest({
              values,
              onSuccess: () => {
                resetForm();
                setSubmitting(false);
                toast({
                  title: 'Password Change Success.',
                  description: 'Your Password has been updated successfully',
                  status: 'success',
                  duration: 3000,
                  position: 'top-right',
                });
              },
            });
          }}
        >
          {(props) => (
            <Box w={['100%', '100%', '60%']}>
              {errors}
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
                  type={showPassword ? 'text' : 'password'}
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
                  isLoading={props.isSubmitting}
                >
                  Save Password
                </Button>
              </form>
            </Box>
          )}
        </Formik>
      </Flex>
    </AccordionLayout>
  );
};
