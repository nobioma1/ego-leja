import React from 'react';

import { AmountStat } from 'components/AmountStat';

export const BorrowingsTab = () => {
  return (
    <AmountStat
      amount="345,670"
      color="green.500"
      currency="NGN"
      label="Debt"
      percentage="23.36"
      type="increase"
      align="center"
    />
  );
};
