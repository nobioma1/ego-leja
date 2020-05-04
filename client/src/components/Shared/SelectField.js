import React from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  Select,
  FormErrorMessage,
} from '@chakra-ui/core';
import { Field } from 'formik';

export const SelectField = ({
  name,
  label,
  options,
  placeholder,
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
            <Select
              {...field}
              {...props}
              id={field.name}
              placeholder={placeholder}
            >
              {options.map((option, index) => (
                <option key={`${option}-${index}`} value={option.value}>
                  {option.name}
                </option>
              ))}
            </Select>
            <FormErrorMessage>{form.errors[field.name]}</FormErrorMessage>
          </FormControl>
        )}
      </Field>
    </Box>
  );
};
