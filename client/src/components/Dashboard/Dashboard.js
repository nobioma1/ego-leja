import React from 'react';
import {
  Box,
  Divider,
  Flex,
  Text,
  useDisclosure,
  Button,
} from '@chakra-ui/core';

import { DetailTabs } from 'components/DetailTabs';
import {
  RecentTransactions,
  MonthTransactions,
  AddTransaction,
} from 'components/Transactions';

export const Dashboard = () => {
  const { onOpen, ...disclosure } = useDisclosure();

  return (
    <Box>
      <Flex alignItems="center" justifyContent="space-between" py={2}>
        <Text fontSize="xl" fontWeight="bold">
          Dashboard
        </Text>
        <Button
          leftIcon="add"
          variantColor="green"
          variant="solid"
          onClick={onOpen}
        >
          Add Transaction
        </Button>
      </Flex>
      <Flex
        direction={['column', 'column', 'row']}
        justifyContent="space-between"
        h={['auto', 'auto', '86vh']}
      >
        <Flex
          direction="column"
          h="100%"
          justifyContent="space-between"
          w={['100%', '100%', '52%']}
          pr={[0, 0, 10]}
        >
          <Box minH="25%">
            <DetailTabs />
          </Box>
          <Divider />
          <Box h={['auto', 'auto', '70%']}>
            <RecentTransactions />
          </Box>
        </Flex>
        <Divider orientation={['horizontal', 'horizontal', 'vertical']} />
        <Flex direction="column" px={[0, 0, 10]} w={['100%', '100%', '48%']}>
          <MonthTransactions />
        </Flex>
      </Flex>
      <AddTransaction disclosure={disclosure} />
    </Box>
  );
};
