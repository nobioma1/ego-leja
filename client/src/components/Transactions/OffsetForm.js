import React, { useState } from 'react';
import {
  Box,
  Button,
  Flex,
  InputLeftAddon,
  Text,
  Switch,
  useToast,
} from '@chakra-ui/core';
import { Formik } from 'formik';
import { FaCoins } from 'react-icons/fa';
import * as Yup from 'yup';

import { AddOnInputField } from 'components/Shared';
import symbols from 'utils/symbols';
import { useRequest } from 'hooks/useRequest';

const OffsetSchema = Yup.object().shape({
  amount: Yup.number().required('amount is required'),
});

export const OffsetForm = ({
  currency,
  recordId,
  payable,
  onClose,
  onSuccess,
}) => {
  const toast = useToast();
  const [offsetAmount, setOffsetAmount] = useState(0);
  const { doRequest } = useRequest({
    url: `/api/transactions/${recordId}`,
    method: 'post',
  });

  return (
    <Formik
      enableReinitialize
      initialValues={{
        amount: offsetAmount,
      }}
      validationSchema={OffsetSchema}
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(true);
        await doRequest({
          values,
          onSuccess: (offset) => {
            setSubmitting(false);
            onClose();
            toast({
              title: 'Offset Successful',
              description: `${offset.amount} has been deducted.`,
              status: 'success',
              duration: 3000,
              position: 'top-right',
            });
            onSuccess();
          },
        });
      }}
    >
      {(props) => (
        <form onSubmit={props.handleSubmit}>
          <Flex justifyContent="space-between">
            <Text>Amount Left: </Text>
            <Text fontSize="xl">
              {symbols[currency]} {payable}
            </Text>
          </Flex>
          <AddOnInputField
            type="number"
            name="amount"
            label="Amount to offset"
            placeholder="50.00"
          >
            <InputLeftAddon children={<Box as={FaCoins} color="gray.300" />} />
          </AddOnInputField>
          <Flex
            w="100%"
            my={2}
            alignItems="center"
            justifyContent="space-between"
          >
            <Text>Full Offset</Text>
            <Switch
              size="md"
              onChange={() =>
                offsetAmount === 0
                  ? setOffsetAmount(payable)
                  : setOffsetAmount(0)
              }
            />
          </Flex>

          <Button type="submit" variantColor="green" size="lg" width="full">
            Offset Amount
          </Button>
        </form>
      )}
    </Formik>
  );
};
