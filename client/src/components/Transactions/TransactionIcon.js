import React from 'react';
import { Box } from '@chakra-ui/core';
import { FiSend, FiRepeat, FiTrendingUp, FiMinusCircle } from 'react-icons/fi';

export const TransactionIcon = ({ type }) => {
  switch (type.toLowerCase()) {
    case 'lending':
      return <Box as={FiSend} size={5} />;
    case 'borrowing':
      return <Box as={FiRepeat} size={5} />;
    case 'pay':
      return <Box as={FiTrendingUp} size={5} />;
    default:
      return <Box as={FiMinusCircle} size={5} />;
  }
};
