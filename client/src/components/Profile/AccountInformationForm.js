import React from 'react';
import { Button } from '@chakra-ui/core';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { InputField, SelectField } from 'components/Shared';

const AccountInformationFormSchema = Yup.object().shape({
  country: Yup.string(),
  state: Yup.string(),
});

export const AccountInformationForm = () => {
  return (
    <Formik
      initialValues={{
        country: '',
        state: '',
      }}
      validationSchema={AccountInformationFormSchema}
      onSubmit={(values, actions) => {
        console.log('submitted');
      }}
    >
      {(props) => (
        <form onSubmit={props.handleSubmit}>
          <SelectField
            label="Country"
            name="country"
            options={[
              { name: 'Nigeria', value: 'NGN' },
              { name: 'Ghana', value: 'GH' },
            ]}
            placeholder="Select Country"
          />
          <InputField
            type="text"
            name="state"
            label="State"
            placeholder="Aba"
          />

          <Button
            type="submit"
            variantColor="green"
            variant="outline"
            size="lg"
            width="full"
          >
            Save Changes
          </Button>
        </form>
      )}
    </Formik>
  );
};
