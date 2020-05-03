import React from 'react';
import { Text, Button } from '@chakra-ui/core';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { AccordionLayout, InputField } from 'components/Shared';

const passwordSchema = Yup.object().shape({
  password: Yup.string().required('password is required'),
});

export const DeleteAccount = () => {
  return (
    <AccordionLayout title="Delete My Account">
      <Text fontSize="md" textAlign="center">
        To delete your account, enter your password to authorize.
      </Text>
      <Formik
        initialValues={{
          password: '',
        }}
        validationSchema={passwordSchema}
        onSubmit={(values, actions) => {
          console.log('submitted');
        }}
      >
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            <InputField
              type="password"
              name="password"
              label="Password"
              placeholder="*********"
            />

            <Button type="submit" variantColor="red" size="lg" width="full">
              Delete Account
            </Button>
          </form>
        )}
      </Formik>
    </AccordionLayout>
  );
};
