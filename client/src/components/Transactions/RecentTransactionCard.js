import React from 'react';
import { Flex, Text } from '@chakra-ui/core';
import moment from 'moment';

import { numberFormat, TypeIcon } from 'utils';

export const RecentTransactionCard = ({ transaction }) => {
  return (
    <Flex justifyContent="space-between" py={3}>
      <Flex alignItems="center">
        <TypeIcon type={transaction.record.recordType} />
        <Flex direction="column" px={3}>
          <Text fontSize="lg">{transaction.record.name}</Text>
          <Text fontSize="sm">
            {moment(transaction.createdAt).format('MMMM DD')} |{' '}
            {transaction.record.recordType}
          </Text>
        </Flex>
      </Flex>
      <Text fontSize="lg" mb={2}>
        {numberFormat({ amount: transaction.amount, currency: 'NGN' })}
      </Text>
    </Flex>
  );
};
