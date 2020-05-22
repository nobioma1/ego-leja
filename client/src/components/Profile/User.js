import React, { useContext } from 'react';
import {
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
import moment from 'moment';

import { UserForm } from './UserForm';
import { UserContext } from 'context/UserContext';

export const User = () => {
  const [{ user }, dispatch] = useContext(UserContext);
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
        <Avatar name={user.fullName} size="2xl" />
      </Flex>
      <Flex pl={3} w={['auto', 'auto', '75%']} position="relative">
        <Box mb={2}>
          <Flex>
            <Text fontSize="2xl" mr={3}>
              {user.fullName}
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
                  <UserForm user={user} dispatch={dispatch} onClose={close} />
                </FocusLock>
              </PopoverContent>
            </Popover>
          </Flex>
          <Text>{user.email}</Text>
        </Box>
        <Text position="absolute" bottom={0}>
          Joined: <br />
          {moment(user.createdAt).format('MMMM DD, YYYY')}
        </Text>
      </Flex>
    </Flex>
  );
};
