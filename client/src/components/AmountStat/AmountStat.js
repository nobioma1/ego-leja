import React from 'react';
import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
} from '@chakra-ui/core';
import { symbols } from 'utils';

export const AmountStat = ({
  label,
  amount,
  currency,
  percentage,
  type,
  color,
  align,
}) => {
  return (
    <Stat>
      <StatLabel textAlign={align ? align : 'right'}>{label}</StatLabel>
      <StatNumber
        textAlign={align ? align : 'right'}
        fontSize="4xl"
        color={color}
      >
        <span>{symbols[currency]}</span> {amount}
      </StatNumber>
      <StatHelpText textAlign={align ? align : 'right'}>
        <StatArrow type={type} />
        {percentage} %
      </StatHelpText>
    </Stat>
  );
};
