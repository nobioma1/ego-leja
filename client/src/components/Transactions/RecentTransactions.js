import React from 'react';
import { Text, Box } from '@chakra-ui/core';

import { RecentTransactionCard } from 'components/Transactions/RecentTransactionCard';

export const RecentTransactions = ({ transactions }) => {
  const recentTransactions = transactions.map((transaction) => (
    <RecentTransactionCard key={transaction.id} transaction={transaction} />
  ));

  return (
    <Box>
      <Text fontSize="xl" fontWeight="bold">
        Recent Transactions
      </Text>
      <Box h={['auto', 'auto', '530px']} overflowY="auto">
        {recentTransactions.length === 0 ? (
          <Text textAlign="center" opacity="0.7" my={3}>
            No transaction yet...
          </Text>
        ) : (
          recentTransactions
        )}
      </Box>
    </Box>
  );
};
