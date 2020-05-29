import { Flex, Text, Box } from '@chakra-ui/core';
import React from 'react';
import moment from 'moment';

export const TransactionTable = () => {
  return (
    <Box minHeight={['150px', '150px', 'xs']}>
      <Flex borderBottomColor="Gray.500" borderBottomWidth="1px" pb={3}>
        <Text w="35%" opacity="0.7">
          Transaction Id
        </Text>
        <Text w="30%" opacity="0.7">
          Amount
        </Text>
        <Text w="30%" opacity="0.7">
          Date
        </Text>
      </Flex>
      <Flex my={2}>
        <Text w="35%">TRX5ecffa63</Text>
        <Text w="30%">31,32424</Text>
        <Text w="30%">{moment(new Date()).format('DD MMM, YYYY')}</Text>
      </Flex>
      <Flex my={2}>
        <Text w="35%">TRX5ecffa63</Text>
        <Text w="30%">31,32424</Text>
        <Text w="30%">{moment(new Date()).format('DD MMM. YYYY')}</Text>
      </Flex>
    </Box>
  );
};
