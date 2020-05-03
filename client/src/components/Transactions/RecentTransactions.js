import React from 'react';
import { Text, Box } from '@chakra-ui/core';

import { TransactionCard } from './TransactionCard';

export const RecentTransactions = () => {
  return (
    <Box>
      <Text fontSize="xl" fontWeight="bold">
        Recent Transactions
      </Text>
      <Box h="530px" overflowY="auto">
        <TransactionCard
          type="Lending"
          name="John Doe"
          currency="NGN"
          amount="30,000"
          date="Tuesday, 30 June"
        />
        <TransactionCard
          type="Borrowing"
          name="John Doe"
          currency="NGN"
          amount="30,000"
          date="Tuesday, 30 June"
        />
        <TransactionCard
          type="Bad Debt"
          name="John Doe"
          currency="NGN"
          amount="30,000"
          date="Tuesday, 30 June"
        />
        <TransactionCard
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
