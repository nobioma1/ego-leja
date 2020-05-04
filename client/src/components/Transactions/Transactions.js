import React, { useState } from 'react';
import { Box, Text, Flex, useDisclosure } from '@chakra-ui/core';

import { Filters } from 'components/Filters';
import { Modal } from 'components/Modal';
import { OffsetForm } from './OffsetForm';
import { TransactionCard } from './TransactionCard';

export const Transactions = () => {
  const disclosure = useDisclosure();
  const btnRef = React.useRef();
  const filters = ['All Transactions', 'Lendings', 'Borrowings', 'Bad Debt'];
  const [activeFilter, setActiveFilter] = useState(0);

  return (
    <Box w="2xl">
      <Flex alignItems="center" justifyContent="space-between" py={2}>
        <Text fontSize="xl" fontWeight="bold">
          Transactions
        </Text>
      </Flex>
      <Filters
        filters={filters}
        setActive={setActiveFilter}
        isActive={activeFilter}
      />
      <Box>
        <TransactionCard
          type="Lending"
          name="John Doe"
          currency="NGN"
          amount="30,000"
          date="Tuesday, 30 June"
          btnRef={btnRef}
          onClickFn={disclosure.onOpen}
        />
        <TransactionCard
          type="Pay"
          name="John Doe"
          currency="NGN"
          amount="30,000"
          date="Tuesday, 30 June"
          btnRef={btnRef}
          onClickFn={disclosure.onOpen}
        />
      </Box>
      <Modal title="John Doe" btnRef={btnRef} {...disclosure}>
        <OffsetForm currency="NGN" amount="30000" />
      </Modal>
    </Box>
  );
};
