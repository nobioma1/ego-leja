import React from 'react';

import { AmountStat } from 'components/AmountStat';

export const TotalTab = () => {
  return (
    <AmountStat
      amount="345,670"
      color="black"
      currency="NGN"
      label="Credit and Debt"
      percentage="23.36"
      type="increase"
      align="center"
    />
  );
};
