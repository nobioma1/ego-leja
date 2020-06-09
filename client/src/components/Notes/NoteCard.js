import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { Flex, Text, PseudoBox } from '@chakra-ui/core';
import moment from 'moment';

import { numberFormat, TypeIcon } from 'utils';

export const NoteCard = ({ note }) => {
  const { url } = useRouteMatch();

  const { id, recordType, name, amount, dueDate, isBadDebt } = note;

  return (
    <Link to={`${url}/${id}`}>
      <PseudoBox
        borderWidth="1px"
        borderColor="gray"
        rounded="md"
        mb={2}
        p={3}
        _hover={{ border: '1px solid #48BB78' }}
        cursor="pointer"
      >
        <Flex justifyContent="space-between" alignItems="center">
          <Flex alignItems="center">
            <TypeIcon type={recordType} isBadDebt={isBadDebt} />
            <Flex direction="column" px={3}>
              <Text fontSize="xl">{name}</Text>
              <Text fontSize="sm">
                Due: {moment(dueDate).format('MMM D, YYYY')} | {recordType}
              </Text>
            </Flex>
          </Flex>
          <Text fontSize="xl">{numberFormat({ amount, currency: 'NGN' })}</Text>
        </Flex>
      </PseudoBox>
    </Link>
  );
};
