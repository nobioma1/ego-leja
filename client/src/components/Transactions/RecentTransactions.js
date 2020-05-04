import React from 'react';
import { Text, Box } from '@chakra-ui/core';

import { RecentTransactionCard } from './RecentTransactionCard';

export const RecentTransactions = () => {
  return (
    <Box>
      <Text fontSize="xl" fontWeight="bold">
        Recent Transactions
      </Text>
      <Box h={['auto', 'auto', '530px']} overflowY="auto">
        <RecentTransactionCard
          type="Lending"
          name="John Doe"
          currency="NGN"
          amount="30,000"
          date="Tuesday, 30 June"
        />
        <RecentTransactionCard
          type="Borrowing"
          name="John Doe"
          currency="NGN"
          amount="30,000"
          date="Tuesday, 30 June"
        />
        <RecentTransactionCard
          type="Bad Debt"
          name="John Doe"
          currency="NGN"
          amount="30,000"
          date="Tuesday, 30 June"
        />
        <RecentTransactionCard
          type="Pay"
          name="John Doe"
          currency="NGN"
          amount="30,000"
          date="Tuesday, 30 June"
        />
      </Box>
    </Box>
  );
};
