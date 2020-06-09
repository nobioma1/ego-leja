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
import { AppContext } from 'context/AppContext';
import { RECORD_TYPE } from '../Notes/notes.types';

const AddNoteSchema = Yup.object().shape({
  amount: Yup.number().positive().required('provide a valid amount'),
  name: Yup.string().required('name is required'),
  description: Yup.string(),
  dueDate: Yup.date().required('set a due date'),
  recordType: Yup.mixed()
    .oneOf(Object.keys(RECORD_TYPE))
    .required('type is required'),
});

export const AddNote = () => {
  const { AddNoteDisclosure, addNote, toaster } = useContext(AppContext);

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
      validationSchema={AddNoteSchema}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        setSubmitting(true);
        await doRequest({
          values,
          onSuccess: (note) => {
            setSubmitting(false);
            resetForm();
            AddNoteDisclosure.onClose();
            addNote(note);
            toaster({
              title: 'Note Created',
              description: `Your new ${note.recordType} Note has been added.`,
            });
          },
        });
      }}
    >
      {(props) => (
        <DrawerLayout disclosure={AddNoteDisclosure} title="New Note">
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
              placeholder="What type of note?"
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
              placeholder="Add more information about note"
            />
            <Stack>
              <Button
                type="submit"
                variantColor="green"
                isLoading={props.isSubmitting}
                loadingText="Adding Note..."
              >
                Submit
              </Button>
              <Button variant="outline" onClick={AddNoteDisclosure.onClose}>
                Cancel
              </Button>
            </Stack>
          </form>
        </DrawerLayout>
      )}
    </Formik>
  );
};
