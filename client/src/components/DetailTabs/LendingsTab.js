import React from 'react';
import { StatGroup } from '@chakra-ui/core';

import { AmountStat } from 'components/AmountStat';

export const LendingsTab = () => {
  return (
    <StatGroup>
      <AmountStat
        amount="345,670"
        color="green.500"
        currency="NGN"
        label="Credit"
        percentage="23.36"
        type="increase"
      />
      <AmountStat
        amount="345,670"
        color="red.500"
        currency="NGN"
        label="Bad Debt"
        percentage="23.36"
        type="decrease"
      />
    </StatGroup>
  );
};
