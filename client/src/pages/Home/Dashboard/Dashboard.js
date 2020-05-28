import React, { useContext } from 'react';
import { Box, Divider, Flex, Text, Button } from '@chakra-ui/core';

import { DetailTabs } from 'components/DetailTabs';
import { MonthTransactions, RecentTransactions } from 'components/Transactions';
import { AppContext } from 'context/AppContext';

export const Dashboard = () => {
  const {
    AddTrxDisclosure: { onOpen },
  } = useContext(AppContext);

  return (
    <Box>
      <Flex alignItems="center" justifyContent="space-between" py={3}>
        <Text fontSize="2xl" fontWeight="bold">
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
      >
        <Flex
          direction="column"
          h="100%"
          justifyContent="space-between"
          w={['100%', '100%', '52%']}
          pr={[0, 0, 10]}
        >
          <Box h="25%">
            <DetailTabs />
          </Box>
          <Divider />
          <Box h={['auto', 'auto', '75%']}>
            <RecentTransactions />
          </Box>
        </Flex>
        <Divider orientation={['horizontal', 'horizontal', 'vertical']} />
        <Flex direction="column" px={[0, 0, 10]} w={['100%', '100%', '48%']}>
          <MonthTransactions />
        </Flex>
      </Flex>
    </Box>
  );
};
