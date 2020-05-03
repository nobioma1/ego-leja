import {
  Input,
  Box,
  FormLabel,
  InputGroup,
  FormErrorMessage,
  FormControl,
} from '@chakra-ui/core';
import { Field } from 'formik';
import React from 'react';

export const InputField = ({
  name,
  label,
  type,
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
            {label && <FormLabel htmlFor={field.name}>{label}</FormLabel>}
            <InputGroup>
              <Input
                {...field}
                {...props}
                id={field.name}
                type={type || 'text'}
                placeholder={placeholder}
              />
              {children}
            </InputGroup>
            <FormErrorMessage>{form.errors[field.name]}</FormErrorMessage>
          </FormControl>
        )}
      </Field>
    </Box>
  );
};

export const AddOnInputField = ({
  name,
  label,
  type,
  placeholder,
  children,
  ...props
}) => {
  return (
    <Box marginY={3}>
      <Field name={name}>
        {({ field, form }) => (
          <FormControl
            isInvalid={form.errors[field.name] && form.touched[field.name]}
          >
            {label && <FormLabel htmlFor={field.name}>{label}</FormLabel>}
            <InputGroup>
              {children}
              <Input
                {...field}
                {...props}
                id={field.name}
                type={type || 'text'}
                placeholder={placeholder}
              />
            </InputGroup>
            <FormErrorMessage>{form.errors[field.name]}</FormErrorMessage>
          </FormControl>
        )}
      </Field>
    </Box>
  );
};
