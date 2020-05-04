import React from 'react';
import { Flex, Text } from '@chakra-ui/core';

import { TransactionIcon } from './TransactionIcon';
import symbols from 'utils/symbols';

export const RecentTransactionCard = ({
  type,
  name,
  currency,
  amount,
  date,
}) => {
  return (
    <Flex justifyContent="space-between" py={3}>
      <Flex alignItems="center">
        <TransactionIcon type={type} />
        <Flex direction="column" px={3}>
          <Text fontSize="lg">{name}</Text>
          <Text fontSize="sm">
            {date} | {type}
          </Text>
        </Flex>
      </Flex>
      <Text fontSize="lg" mb={2}>
        {symbols[currency]} {amount}
      </Text>
    </Flex>
  );
};
