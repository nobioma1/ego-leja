import React from 'react';
import { Stack, InputLeftAddon, Box } from '@chakra-ui/core';
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

const AddTransactionSchema = Yup.object().shape({
  name: Yup.string().required('name is required'),
  desc: Yup.string(),
  dueDate: Yup.string(),
  transactionType: Yup.string().required('option is required'),
});

export const AddTransaction = ({ disclosure }) => {
  return (
    <Formik
      initialValues={{
        name: '',
        desc: '',
        dueDate: new Date(),
        transactionType: '',
      }}
      validationSchema={AddTransactionSchema}
      onSubmit={(values, actions) => {
        console.log('submitted');
      }}
    >
      {(props) => (
        <DrawerLayout
          disclosure={disclosure}
          title="Add Transaction"
          onSubmit={props.handleSubmit}
        >
          <form onSubmit={props.handleSubmit}>
            <Stack spacing="10px">
              <InputField
                type="text"
                name="name"
                label="Name"
                placeholder="Jane Joe"
              />
              <SelectField
                label="Transaction Type"
                name="transactionType"
                options={[
                  { name: 'Lending', value: 'LEND' },
                  { name: 'Borrowing', value: 'BORROW' },
                ]}
                placeholder="Select Transaction Type"
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
                name="desc"
                label="Description"
                placeholder="Add more information about transaction"
              />
            </Stack>
          </form>
        </DrawerLayout>
      )}
    </Formik>
  );
};
