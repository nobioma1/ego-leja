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
} from '@chakra-ui/core';
import FocusLock from 'react-focus-lock';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { InputField, SelectField } from 'components/Shared';

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
          <SelectField
            label="Title"
            name="title"
            options={[
              { name: 'Mr.', value: 'mr' },
              { name: 'Mrs.', value: 'mrs' },
              { name: 'Miss.', value: 'miss' },
            ]}
            placeholder="Select title"
          />
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
    <Flex my={3} py={[0, 0, 3]}>
      <Flex
        alignItems="center"
        justifyContent="center"
        w={['auto', 'auto', '25%']}
      >
        <Avatar name="John Doe" size="2xl" />
      </Flex>
      <Flex pl={3} w={['auto', 'auto', '75%']} position="relative">
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
          Joined: <br />
          21st August, 2020
        </Text>
      </Flex>
    </Flex>
  );
};
