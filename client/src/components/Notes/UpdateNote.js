import React, { useContext } from 'react';
import { Stack, InputLeftAddon, Box, Button } from '@chakra-ui/core';
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
import { RECORD_TYPE } from './notes.types';
import { AppContext } from 'context/AppContext';

const updateNoteSchema = Yup.object().shape({
  name: Yup.string().required('name is required'),
  description: Yup.string(),
  dueDate: Yup.date().required('Set a due date'),
});

export const UpdateNote = ({ disclosure, record, onEditSuccess }) => {
  const { toaster } = useContext(AppContext);
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
      validationSchema={updateNoteSchema}
      onSubmit={async (
        { dueDate, name, description },
        { setSubmitting, resetForm }
      ) => {
        setSubmitting(true);
        await doRequest({
          values: { dueDate, name, description },
          onSuccess: (note) => {
            setSubmitting(false);
            resetForm();
            onEditSuccess((prevDetails) => ({ ...prevDetails, ...note }));
            disclosure.onClose();
            toaster({
              title: 'Note Update Saved Successfully',
              description: `${note.name} ${note.recordType} Note has been updated.`,
            });
          },
        });
      }}
    >
      {(props) => (
        <DrawerLayout disclosure={disclosure} title="Update Note">
          <form onSubmit={props.handleSubmit}>
            <InputField
              type="text"
              name="name"
              label="Name"
              placeholder="Jane Joe"
            />
            <SelectField
              label="Note Type"
              name="recordType"
              options={Object.entries(RECORD_TYPE).map((item) => ({
                name: item[0],
                value: item[1],
              }))}
              isDisabled
              subInfo="Note Type cannot be edited"
              placeholder="What type of note?"
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
              placeholder="Add more information about note"
            />
            <Stack>
              <Button
                type="submit"
                variantColor="green"
                isLoading={props.isSubmitting}
                loadingText="Saving Note Changes..."
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
