import {
  Input,
  Box,
  FormLabel,
  InputGroup,
  FormErrorMessage,
  FormControl,
  Flex,
  Icon,
  Text,
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
    <Box marginY={2}>
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
  required,
  subInfo,
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
            {subInfo && (
              <Flex alignItems="center" mb={1} opacity="0.7">
                <Icon name="info" size="18px" color="yellow.500" mr={3} />
                <Text>{subInfo}</Text>
              </Flex>
            )}
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
