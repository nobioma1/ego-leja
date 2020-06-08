import React from 'react';
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
import { TRANSACTION_TYPE } from './transaction.types';

const AddTransactionSchema = Yup.object().shape({
  name: Yup.string().required('name is required'),
  description: Yup.string(),
  dueDate: Yup.date().required('Set a due date'),
});

export const UpdateTransaction = ({ disclosure, record, onEditSuccess }) => {
  const toast = useToast();
  const { doRequest } = useRequest({
    method: 'put',
    url: `/api/records/${record.id}`,
  });

  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        amount: record.amount,
        name: record.name,
        description: record.description,
        dueDate: new Date(record.dueDate),
        recordType: record.recordType,
      }}
      validationSchema={AddTransactionSchema}
      onSubmit={async (
        { dueDate, name, description },
        { setSubmitting, resetForm }
      ) => {
        setSubmitting(true);
        await doRequest({
          values: { dueDate, name, description },
          onSuccess: (trx) => {
            setSubmitting(false);
            resetForm();
            onEditSuccess((prevDetails) => ({ ...prevDetails, ...trx }));
            disclosure.onClose();
            toast({
              title: 'Transaction Updated',
              description: `${trx.name} has been updated.`,
              status: 'success',
              duration: 3000,
              position: 'top-right',
            });
          },
        });
      }}
    >
      {(props) => (
        <DrawerLayout disclosure={disclosure} title="Update Transaction">
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
              isDisabled
              subInfo="Transaction Type cannot be edited"
              placeholder="What type of transaction?"
            />
            <AddOnInputField
              type="number"
              name="amount"
              label="Amount"
              placeholder="50.00"
              subInfo="Amount cannot be edited"
              isDisabled
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
                loadingText="Saving Transaction..."
              >
                Save Changes
              </Button>
              <Button variant="outline" onClick={disclosure.onClose}>
                Cancel
              </Button>
            </Stack>
          </form>
        </DrawerLayout>
      )}
    </Formik>
  );
};
