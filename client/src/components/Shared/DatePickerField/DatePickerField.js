import React from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Flex,
  Icon,
  Text,
} from '@chakra-ui/core';
import DatePicker from 'react-datepicker';
import { Field } from 'formik';

import './datePickerField.css';
import 'react-datepicker/dist/react-datepicker.css';

export const DatePickerField = ({
  name,
  label,
  options,
  placeholder,
  required,
  minDate,
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
            <Flex direction="column">
              {label && <FormLabel htmlFor={field.name}>{label}</FormLabel>}
              <Flex alignItems="center">
                <Icon name="calendar" size="30px" color="gray.500" mr={3} />
                <DatePicker
                  {...field}
                  {...props}
                  onChange={(val) => form.setFieldValue(field.name, val)}
                  minDate={minDate}
                  selected={field.value}
                />
                <Text ml={3}>Today</Text>
              </Flex>
            </Flex>
            <FormErrorMessage>{form.errors[field.name]}</FormErrorMessage>
          </FormControl>
        )}
      </Field>
    </Box>
  );
};
