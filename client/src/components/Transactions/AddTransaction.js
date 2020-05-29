import React, { useContext } from 'react';
import { Stack, InputLeftAddon, Box, Button, useToast } from '@chakra-ui/core';
import { Formik } from 'formik';
import { FaCoins } from 'react-icons/fa';
import * as Yup from 'yup';

import { DrawerLayout } from 'components/Drawer';
import {
  InputField,
  SelectField,
  TextAreaField,
  AddOnInputField,
  DatePickerField,
} from 'components/Shared';
import { useRequest } from 'hooks/useRequest';
import { AppContext } from 'context/AppContext';
import { TRANSACTION_TYPE } from './transaction.types';

const AddTransactionSchema = Yup.object().shape({
  amount: Yup.number().positive().required('Provide amount for transaction'),
  name: Yup.string().required('name is required'),
  description: Yup.string(),
  dueDate: Yup.date().required('Set a due date'),
  recordType: Yup.mixed()
    .oneOf(Object.keys(TRANSACTION_TYPE))
    .required('Transaction type is required'),
});

export const AddTransaction = () => {
  const { AddTrxDisclosure, addTransaction } = useContext(AppContext);

  const toast = useToast();
  const { doRequest } = useRequest({
    method: 'post',
    url: '/api/records',
  });

  return (
    <Formik
      initialValues={{
        amount: '',
        name: '',
        description: '',
        dueDate: new Date(),
        recordType: '',
      }}
      validationSchema={AddTransactionSchema}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        setSubmitting(true);
        await doRequest({
          values,
          onSuccess: (trx) => {
            setSubmitting(false);
            resetForm();
            AddTrxDisclosure.onClose();
            addTransaction(trx);
            toast({
              title: 'Transaction created',
              description: `Your new ${trx.recordType} TRX has been added.`,
              status: 'success',
              duration: 3000,
              position: 'top-right',
            });
          },
        });
      }}
    >
      {(props) => (
        <DrawerLayout disclosure={AddTrxDisclosure} title="Add Transaction">
          <form onSubmit={props.handleSubmit}>
            <InputField
              type="text"
              name="name"
              label="Name"
              placeholder="Jane Joe"
            />
            <SelectField
              label="Transaction Type"
              name="recordType"
              options={Object.entries(TRANSACTION_TYPE).map((item) => ({
                name: item[0],
                value: item[1],
              }))}
              placeholder="What type of transaction?"
            />
            <AddOnInputField
              type="number"
              name="amount"
              label="Amount"
              placeholder="50.00"
            >
              <InputLeftAddon
                children={<Box as={FaCoins} color="gray.300" />}
              />
            </AddOnInputField>
            <DatePickerField
              name="dueDate"
              label="Due Date"
              minDate={new Date()}
            />
            <TextAreaField
              name="description"
              label="Description"
              placeholder="Add more information about transaction"
            />
            <Stack>
              <Button
                type="submit"
                variantColor="green"
                isLoading={props.isSubmitting}
                loadingText="Adding Transaction..."
              >
                Submit
              </Button>
              <Button variant="outline" onClick={AddTrxDisclosure.onClose}>
                Cancel
              </Button>
            </Stack>
          </form>
        </DrawerLayout>
      )}
    </Formik>
  );
};
