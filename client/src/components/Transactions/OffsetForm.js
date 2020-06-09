import React, { useState, useContext } from 'react';
import {
  Box,
  Button,
  Flex,
  InputLeftAddon,
  Text,
  Switch,
} from '@chakra-ui/core';
import { Formik } from 'formik';
import { FaCoins } from 'react-icons/fa';
import * as Yup from 'yup';

import { AddOnInputField } from 'components/Shared';
import { useRequest } from 'hooks/useRequest';
import { numberFormat } from 'utils';
import { AppContext } from 'context/AppContext';

const OffsetSchema = Yup.object().shape({
  amount: Yup.number().required('amount is required'),
});

export const OffsetForm = ({ recordId, payable, onClose, onSuccess }) => {
  const { toaster } = useContext(AppContext);
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
            toaster({
              title: 'Transaction Successful',
              description: `${numberFormat({
                amount: offset.amount,
              })} has been deducted.`,
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
              {numberFormat({ amount: payable, currency: 'NGN' })}
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
