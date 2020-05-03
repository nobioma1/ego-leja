import React from 'react';
import { Flex, Text, Button } from '@chakra-ui/core';

import { TransactionIcon } from './TransactionIcon';
import symbols from 'utils/symbols';

export const TransactionCard = ({
  type,
  name,
  currency,
  amount,
  date,
  btnRef,
  onClickFn,
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
      <Flex direction="column">
        <Text fontSize="lg" mb={2}>
          {symbols[currency]} {amount}
        </Text>
        {onClickFn && (
          <Button
            opacity="0.5"
            onClick={onClickFn}
            ref={btnRef}
            variant="outline"
            variantColor="green"
            size="sm"
            _hover={{ opacity: '1' }}
          >
            Offset
          </Button>
        )}
      </Flex>
    </Flex>
  );
};
