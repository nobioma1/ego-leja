import React, { useState, useEffect, useContext } from 'react';
import { Box, Text, Button, Flex } from '@chakra-ui/core';

import { HomeContentLayout } from 'components/Layout';
import { useRequest } from 'hooks/useRequest';
import { Filters } from 'components/Filters';
import { AppContext } from 'context/AppContext';
import { TransactionCard } from 'components/Transactions/TransactionCard';

export const Transactions = () => {
  const filters = ['All', 'Lendings', 'Borrowings', 'Bad Debt'];
  const [activeFilter, setActiveFilter] = useState(0);
  const {
    state: { transactions },
    AddTrxDisclosure: { onOpen },
    setTransactions,
  } = useContext(AppContext);

  const { doRequest } = useRequest({
    method: 'get',
    url: '/api/records',
  });

  useEffect(() => {
    doRequest({
      onSuccess: (trxs) => {
        setTransactions(trxs);
      },
    });
  }, []);

  return (
    <HomeContentLayout title="Transactions">
      <Flex
        justifyContent="space-between"
        flexDirection={['column', 'column', 'row']}
        pb={3}
      >
        <Filters
          filters={filters}
          setActive={setActiveFilter}
          isActive={activeFilter}
        />
        <Button
          leftIcon="add"
          variantColor="green"
          variant="solid"
          size="sm"
          onClick={onOpen}
        >
          Add Transaction
        </Button>
      </Flex>
      {transactions.length > 0 ? (
        transactions.map((trx) => (
          <Box key={trx.id}>
            <TransactionCard transaction={trx} />
          </Box>
        ))
      ) : (
        <Text textAlign="center" my={5} fontSize="lg" opacity={0.8}>
          You don't have any transaction
        </Text>
      )}
    </HomeContentLayout>
  );
};
