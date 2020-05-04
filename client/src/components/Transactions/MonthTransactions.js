import React from 'react';
import { Text, Box, Flex } from '@chakra-ui/core';

import { AmountStat } from 'components/AmountStat';
import { Chart } from './Chart';

export const MonthTransactions = () => {
  return (
    <Box>
      <Text fontSize="xl" fontWeight="bold" pb={2}>
        Transactions this Month
      </Text>
      <AmountStat
        amount="345,670"
        color="black"
        currency="NGN"
        label="May, 2019"
        percentage="23.36"
        type="decrease"
        align="left"
      />
      <Flex justifyContent="center" pb={3}>
        <Chart />
      </Flex>
    </Box>
  );
};
