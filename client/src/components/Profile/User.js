import React from 'react';
import {
  ButtonGroup,
  Button,
  Box,
  Popover,
  PopoverTrigger,
  IconButton,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  Flex,
  Avatar,
  Text,
  FormControl,
  FormLabel,
  Select,
  FormErrorMessage,
} from '@chakra-ui/core';
import FocusLock from 'react-focus-lock';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';

import { InputField } from 'components/Shared';

const ChangeNameSchema = Yup.object().shape({
  title: Yup.string().required('title is required'),
  firstName: Yup.string().required('first name is required'),
  LastName: Yup.string().required('last name is required'),
});

const Form = ({ onCancel }) => {
  return (
    <Formik
      initialValues={{
        title: '',
        firstName: '',
        lastName: '',
      }}
      validationSchema={ChangeNameSchema}
      onSubmit={(values, actions) => {
        console.log('submitted');
      }}
    >
      {(props) => (
        <form onSubmit={props.handleSubmit}>
          <Field name="title">
            {({ field, form }) => (
              <FormControl
                isInvalid={form.errors[field.name] && form.touched[field.name]}
              >
                <FormLabel htmlFor={field.name}>Title</FormLabel>
                <Select {...field} id={field.name} placeholder="select a title">
                  <option value="Mr.">Mr.</option>
                  <option value="Mrs.">Mrs.</option>
                  <option value="Miss.">Miss.</option>
                </Select>
                <FormErrorMessage>{form.errors[field.name]}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <InputField type="text" name="firstName" label="First Name" />
          <InputField type="text" name="lastName" label="Last Name" />
          <ButtonGroup d="flex" justifyContent="flex-end">
            <Button variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" variantColor="purple">
              Save
            </Button>
          </ButtonGroup>
        </form>
      )}
    </Formik>
  );
};

export const User = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return (
    <Flex my={3} py={3}>
      <Flex alignItems="center" justifyContent="center" w="25%">
        <Avatar name="John Doe" size="2xl" />
      </Flex>
      <Box pl={3} w="75%" position="relative">
        <Box mb={2}>
          <Flex>
            <Text fontSize="2xl" mr={3}>
              John Doe
            </Text>
            <Popover
              isOpen={isOpen}
              onOpen={open}
              onClose={close}
              placement="right"
              closeOnBlur={false}
            >
              <PopoverTrigger>
                <IconButton size="sm" icon="edit" />
              </PopoverTrigger>
              <PopoverContent zIndex={4} p={5}>
                <FocusLock returnFocus persistentFocus={false}>
                  <PopoverArrow bg="white" />
                  <PopoverCloseButton />
                  <Form onCancel={close} />
                </FocusLock>
              </PopoverContent>
            </Popover>
          </Flex>
          <Text>johndeo@email.co</Text>
        </Box>
        <Text position="absolute" bottom={0}>
          Joined: 21st August, 2020
        </Text>
      </Box>
    </Flex>
  );
};
