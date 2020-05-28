import { Box, Flex, Text, useDisclosure } from '@chakra-ui/core';
import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';

import { Login } from './Login';
import { Signup } from './Signup';
import { TopBar } from './TopBar';
import { AuthContext } from 'context/AuthContext';

export const Landing = () => {
  const { isAuthenticated } = useContext(AuthContext);

  const {
    isOpen: isOpenLogin,
    onOpen: onOpenLogin,
    onClose: onCloseLogin,
  } = useDisclosure();
  const {
    isOpen: isOpenSignUp,
    onOpen: onOpenSignup,
    onClose: onCloseSignUp,
  } = useDisclosure();

  if (isAuthenticated) return <Redirect to="/home" />;

  return (
    <>
      <Flex h="100%" w="100%" background="#fbf9f9" position="absolute">
        <Box
          w={['100%', '80%', '70%']}
          padding={[4, 4, 10]}
          backgroundImage="url('images/wallet.svg')"
          backgroundRepeat="no-repeat"
          backgroundPosition="right bottom"
          backgroundSize={['50%', '20%', '50%']}
        >
          <TopBar onOpenLogin={onOpenLogin} onOpenSignup={onOpenSignup} />
          <Flex
            w={['100%', '90%']}
            h="80%"
            direction="column"
            p={['2', '2', '20']}
            justifyContent="center"
          >
            <Box w="100%" mb={10}>
              <Text
                as="h2"
                fontSize={['5xl', '4xl', '6xl']}
                fontWeight="bold"
                lineHeight={1.2}
              >
                Credit tracking, <br />
                has never been so simplified.
              </Text>
            </Box>
            <Text fontSize={['xl', 'xl', '2xl']}>
              A money lending management web application that will keep track of
              your lendings, payments, notify on due dates, pending amount...
            </Text>
          </Flex>
        </Box>
        <Box
          backgroundImage="url('images/banner.svg')"
          backgroundRepeat="no-repeat"
          backgroundSize="cover"
          h="100%"
          w="30%"
          display={['none', 'block']}
        />
      </Flex>
      <Login isOpen={isOpenLogin} onClose={onCloseLogin} />
      <Signup isOpen={isOpenSignUp} onClose={onCloseSignUp} />
    </>
  );
};
