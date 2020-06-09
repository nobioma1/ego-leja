import React, { useState, useContext, useEffect } from 'react';
import { Box, Flex, Spinner, Image } from '@chakra-ui/core';

import logo from 'assets/logo.svg';
import { HomeRoute } from 'components/Routes';
import { Sidebar } from 'components/Sidebar';
import { TopBar } from 'components/TopBar';
import { useRequest } from 'hooks/useRequest';
import { UserContext } from 'context/UserContext';
import { AppContextProvider } from 'context/AppContext';
import { AddNote } from 'components/Notes';

export const Home = () => {
  const [isOpen, setIsOpen] = useState(false);

  const {
    state: { user },
    setUser,
  } = useContext(UserContext);

  const { doRequest, errors } = useRequest({
    method: 'get',
    url: '/api/users',
  });

  useEffect(() => {
    doRequest({
      onSuccess: (user) => setUser(user),
    });
  }, []);

  return !user ? (
    <Flex
      height="100vh"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      <Image src={logo} alt="Credit logo" h={20} mr={2} />
      {!errors ? (
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="green.200"
          color="green.500"
          size="xl"
        />
      ) : (
        errors
      )}
    </Flex>
  ) : (
    <Flex>
      <Box
        position={isOpen ? 'fixed' : 'static'}
        left="0"
        display={isOpen ? 'block' : ['none', 'none', 'block']}
        h={['100%', '100%', '100vh']}
        w={['70%', '70%', '25%']}
        backgroundColor="white"
        zIndex="docked"
      >
        <Sidebar />
      </Box>
      <Flex
        h="100vh"
        w={['full', '70%', '75%']}
        pt={[2, 2, 5]}
        justifyContent="center"
      >
        <Flex w={['full', 'full', '4xl']} direction="column">
          <TopBar onClick={() => setIsOpen(!isOpen)} />
          <Box mx={2}>
            <AppContextProvider>
              <HomeRoute />
              <AddNote />
            </AppContextProvider>
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
};
