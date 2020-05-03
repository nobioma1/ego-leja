import React, { useState } from 'react';
import {
  Button,
  InputLeftAddon,
  Box,
  Switch,
  Flex,
  Text,
} from '@chakra-ui/core';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { FaCoins } from 'react-icons/fa';

import { AddOnInputField } from 'components/Shared';
import symbols from 'utils/symbols';

const OffsetSchema = Yup.object().shape({
  amount: Yup.number().required('amount is required'),
});

export const OffsetForm = ({ amount, currency }) => {
  const [offsetAmount, setOffsetAmount] = useState(0);

  return (
    <Formik
      enableReinitialize
      initialValues={{
        amount: offsetAmount,
      }}
      validationSchema={OffsetSchema}
      onSubmit={(values, actions) => {
        console.log('submitted');
      }}
    >
      {(props) => (
        <form onSubmit={props.handleSubmit}>
          <Flex justifyContent="space-between">
            <Text>Amount Left: </Text>
            <Text fontSize="xl">
              {symbols[currency]} {amount}
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
                  ? setOffsetAmount(amount)
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
