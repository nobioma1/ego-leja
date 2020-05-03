import React from 'react';
import {
  Button,
  Select,
  FormLabel,
  Box,
  FormControl,
  FormErrorMessage,
} from '@chakra-ui/core';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';

import { InputField } from 'components/Shared';

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
        phoneNumber: '',
      }}
      validationSchema={AccountInformationFormSchema}
      onSubmit={(values, actions) => {
        console.log('submitted');
      }}
    >
      {(props) => (
        <form onSubmit={props.handleSubmit}>
          <Box marginY={3}>
            <Field name="country">
              {({ field, form }) => (
                <FormControl
                  isInvalid={
                    form.errors[field.name] && form.touched[field.name]
                  }
                >
                  <FormLabel htmlFor={field.name}>Country</FormLabel>
                  <Select
                    {...field}
                    id={field.name}
                    placeholder="select country"
                  >
                    <option value="NGN">Nigeria</option>
                    <option value="GH">Ghana</option>
                  </Select>
                  <FormErrorMessage>{form.errors[field.name]}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
          </Box>
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
