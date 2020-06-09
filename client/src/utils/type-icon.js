import React from 'react';
import { Box } from '@chakra-ui/core';
import { FiSend, FiRepeat, FiTrendingUp, FiMinusCircle } from 'react-icons/fi';

const Icon = ({ El, isBadDebt }) => {
  return <Box as={El} color={isBadDebt && 'red.500'} size={5} />;
};

export const TypeIcon = ({ type, ...props }) => {
  switch (type.toLowerCase()) {
    case 'lend':
      return <Icon El={FiSend} {...props} />;
    case 'borrow':
      return <Icon El={FiRepeat} {...props} />;
    case 'pay':
      return <Icon El={FiTrendingUp} {...props} />;
    default:
      return <Icon El={FiMinusCircle} {...props} />;
  }
};
