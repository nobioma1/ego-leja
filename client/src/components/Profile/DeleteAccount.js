import React from 'react';
import { Button, Box, Flex, useToast, useDisclosure } from '@chakra-ui/core';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { AccordionLayout, InputField } from 'components/Shared';
import { useRequest } from 'hooks/useRequest';
import { Modal } from 'components/Modal';
import { clearSession } from 'utils/sessions';

const passwordSchema = Yup.object().shape({
  password: Yup.string().required('password is required'),
});

export const DeleteAccount = () => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { doRequest, errors } = useRequest({
    method: 'post',
    url: '/api/users/delete-user',
  });

  return (
    <AccordionLayout title="Delete My Account">
      <Box fontSize="md" textAlign="center">
        Delete Account and User data. This action is irreversible.
      </Box>
      <Flex justifyContent="center">
        <Button
          size="lg"
          width="full"
          variant="outline"
          variantColor="red"
          onClick={() => onOpen()}
          w={['auto', 'auto', '60%']}
          my={2}
        >
          Delete Account
        </Button>
      </Flex>
      <Modal title="Delete Account" isOpen={isOpen} onClose={onClose}>
        <Box fontSize="md" textAlign="center">
          To delete your account, you have to enter your password.
        </Box>
        <Formik
          initialValues={{
            password: '',
          }}
          validationSchema={passwordSchema}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            setSubmitting(true);
            await doRequest({
              values,
              onSuccess: () => {
                setSubmitting(false);
                toast({
                  title: 'Delete Account.',
                  description: 'Your account had been deleted successfully',
                  status: 'success',
                  duration: 3000,
                  position: 'top-right',
                });
                onClose();
                setTimeout(() => {
                  clearSession();
                }, 2000);
              },
            });
          }}
        >
          {(props) => (
            <form onSubmit={props.handleSubmit}>
              {errors}
              <InputField
                type="password"
                name="password"
                placeholder="Password"
              />
              <Button
                type="submit"
                variantColor="red"
                size="lg"
                width="full"
                isLoading={props.isSubmitting}
              >
                Delete My Account
              </Button>
            </form>
          )}
        </Formik>
      </Modal>
    </AccordionLayout>
  );
};
