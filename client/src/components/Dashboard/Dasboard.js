import React from 'react';
import { Box, Divider, Flex, Text, useDisclosure } from '@chakra-ui/core';

import { DetailTabs } from 'components/DetailTabs';
import { AddTransactionMenu } from 'components/Menu';
import {
  RecentTransactions,
  MonthTransactions,
  AddBorrowing,
  AddCredit,
} from 'components/Transactions';

export const Dashboard = () => {
  const { onOpen: creditOnOpen, ...creditDisclosure } = useDisclosure();
  const { onOpen: borrowingOnOpen, ...borrowingDisclosure } = useDisclosure();

  return (
    <Box>
      <Flex alignItems="center" justifyContent="space-between" py={2}>
        <Text fontSize="xl" fontWeight="bold">
          Dashboard
        </Text>
        <AddTransactionMenu
          borrowingOnOpen={borrowingOnOpen}
          creditOnOpen={creditOnOpen}
        />
      </Flex>
      <Flex justifyContent="space-between" h="86vh">
        <Flex
          direction="column"
          h="100%"
          justifyContent="space-between"
          w="52%"
          pr={10}
        >
          <Box minH="25%">
            <DetailTabs />
          </Box>
          <Divider />
          <Box h="70%">
            <RecentTransactions />
          </Box>
        </Flex>
        <Divider orientation="vertical" />
        <Flex direction="column" px={10} w="48%">
          <MonthTransactions />
        </Flex>
      </Flex>
      <AddBorrowing disclosure={borrowingDisclosure} />
      <AddCredit disclosure={creditDisclosure} />
    </Box>
  );
};
