import React from 'react';
import { Flex, Box, Text } from '@chakra-ui/core';

import { NavLink, Link, useRouteMatch } from 'react-router-dom';
import {
  MdDashboard,
  MdFiberSmartRecord,
  MdPermIdentity,
  MdNotifications,
} from 'react-icons/md';

export const NavItem = ({ to, title, icon }) => {
  return (
    <Link
      as={NavLink}
      display="block"
      fontSize="lg"
      to={to}
      _focus={{ outline: 'none' }}
    >
      <Flex alignItems="center" my={4}>
        <Box as={icon} size="30px" color="green.400" mr={3} />
        <Text fontSize="md">{title}</Text>
      </Flex>
    </Link>
  );
};

export const Nav = () => {
  const { url } = useRouteMatch();

  return (
    <Flex direction="column" h="65%">
      <NavItem to={`${url}`} title="Dashboard" icon={MdDashboard} />
      <NavItem to={`${url}/profile`} title="Profile" icon={MdPermIdentity} />
      <NavItem to={`${url}/notes`} title="Notes" icon={MdFiberSmartRecord} />
      <NavItem
        to={`${url}/notifications`}
        title="Notifications"
        icon={MdNotifications}
      />
    </Flex>
  );
};
