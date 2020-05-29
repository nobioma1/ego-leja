import { Alert, Flex } from '@chakra-ui/core';
import React, { useState } from 'react';
import axios from 'axios';

export const useRequest = ({ method, url }) => {
  const [errors, setErrors] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState([]);

  const doRequest = async ({ values, onSuccess }) => {
    setIsLoading(true);
    try {
      const response = await axios[method](url, values);

      if (onSuccess) {
        onSuccess(response.data);
      }

      setIsLoading(false);
      return response.data;
    } catch (err) {
      setIsLoading(false);
      if (err.response && err.response.data.errors) {
        const fields = [];
        const formattedErrors = err.response.data.errors.map((error) => {
          // Format error for input errors on formik
          if (error.field) {
            fields.push({ [error.field]: error.message });
          }

          // UI errors
          return (
            <Alert
              as={Flex}
              justifyContent="center"
              status="warning"
              variant="left-accent"
              key={error.message}
              my={1}
            >
              {error.message}
            </Alert>
          );
        });

        setErrors(formattedErrors);
        setFieldErrors(fields);
      }
    }
  };

  return { doRequest, errors, fieldErrors, isLoading };
};
