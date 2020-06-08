import { Flex, Text, Box } from '@chakra-ui/core';
import React from 'react';
import moment from 'moment';

export const TransactionTable = ({ transactions }) => {
  const transactionRow = transactions.map((transaction, index) => (
    <Flex my={2} key={transaction.id}>
      <Text w="15%" textAlign="right">
        {index + 1}
      </Text>
      <Text w="40%" textAlign="right">
        {transaction.amount}
      </Text>
      <Text w="35%" textAlign="right">
        {moment(transaction.createdAt).format('DD MMM, YYYY')}
      </Text>
    </Flex>
  ));

  return (
    <Box minHeight={['150px', '150px', 'xs']}>
      <Flex borderBottomColor="Gray.500" borderBottomWidth="1px" pb={3}>
        <Text w="15%" textAlign="right" opacity="0.7">
          Serial
        </Text>
        <Text w="40%" textAlign="right" opacity="0.7">
          Amount
        </Text>
        <Text w="35%" textAlign="right" opacity="0.7">
          Date
        </Text>
      </Flex>
      {transactions.length === 0 ? (
        <Text textAlign="center" opacity="0.7" my={3}>
          No transaction yet...
        </Text>
      ) : (
        transactionRow
      )}
    </Box>
  );
};
