import React from 'react';
import { ButtonGroup, Button } from '@chakra-ui/core';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { InputField } from 'components/Shared';
import { useRequest } from 'hooks/useRequest';
import { userTypes } from 'context/UserContext';

const ChangeNameSchema = Yup.object().shape({
  fullName: Yup.string()
    .matches(/(\w.+\s).+/, 'firstname and lastname are required')
    .required('full name is required'),
});

export const UserForm = ({ user, dispatch, onClose }) => {
  const { doRequest } = useRequest({
    method: 'put',
    url: '/api/users',
  });

  return (
    <Formik
      enableReinitialize
      initialValues={{
        fullName: user.fullName,
      }}
      validationSchema={ChangeNameSchema}
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(true);
        await doRequest({
          values,
          onSuccess: (user) => {
            onClose();
            setSubmitting(false);
            dispatch({ type: userTypes.setUser, payload: user });
          },
        });
      }}
    >
      {(props) => (
        <form onSubmit={props.handleSubmit}>
          <InputField
            type="text"
            name="fullName"
            label="Update Full Name"
            placeholder="Firstname Lastname"
          />
          <ButtonGroup d="flex" justifyContent="flex-end">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              variantColor="green"
              isLoading={props.isSubmitting}
              isDisabled={props.values.fullName === user.fullName}
            >
              Save
            </Button>
          </ButtonGroup>
        </form>
      )}
    </Formik>
  );
};
