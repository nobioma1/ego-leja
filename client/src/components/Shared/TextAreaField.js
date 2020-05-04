import {
  Box,
  FormLabel,
  FormErrorMessage,
  FormControl,
  Textarea,
} from '@chakra-ui/core';
import { Field } from 'formik';
import React from 'react';

export const TextAreaField = ({
  name,
  label,
  placeholder,
  children,
  required,
  ...props
}) => {
  return (
    <Box marginY={3}>
      <Field name={name}>
        {({ field, form }) => (
          <FormControl
            isInvalid={form.errors[field.name] && form.touched[field.name]}
            isRequired={required}
          >
            <FormLabel htmlFor={field.name}>{label}</FormLabel>
            <Textarea
              {...field}
              {...props}
              id={field.name}
              placeholder={placeholder}
            />
            <FormErrorMessage>{form.errors[field.name]}</FormErrorMessage>
          </FormControl>
        )}
      </Field>
    </Box>
  );
};
