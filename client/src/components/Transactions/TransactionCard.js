import React, { useState } from 'react';
import {
  Flex,
  Text,
  Button,
  Collapse,
  Box,
  PseudoBox,
  Stack,
} from '@chakra-ui/core';

import { TransactionIcon } from './TransactionIcon';
import symbols from 'utils/symbols';

export const TransactionCard = ({
  type,
  name,
  currency,
  amount,
  date,
  btnRef,
  onClickFn,
}) => {
  const [show, setShow] = useState(false);

  const handleCollapseToggle = (e) => {
    setShow(!show);
  };

  const offsetBtnHandler = (e) => {
    e.stopPropagation();

    onClickFn();
  };

  return (
    <PseudoBox
      borderWidth="1px"
      borderColor="gray"
      rounded="md"
      onClick={handleCollapseToggle}
      mb={2}
      p={3}
      _hover={{ border: '1px solid #48BB78' }}
      cursor="pointer"
    >
      <Flex justifyContent="space-between">
        <Flex alignItems="center">
          <TransactionIcon type={type} />
          <Flex direction="column" px={3}>
            <Text fontSize="xl">{name}</Text>
            <Text fontSize="sm">
              Due: {date} | {type}
            </Text>
          </Flex>
        </Flex>
        <Flex direction="column">
          <Text fontSize="xl" mb={2}>
            <Text as="span" fontSize="sm">
              {symbols[currency]}
            </Text>{' '}
            {amount}
          </Text>
          {onClickFn && (
            <Button
              onClick={offsetBtnHandler}
              ref={btnRef}
              variant="solid"
              variantColor="green"
              size="xs"
            >
              Offset
            </Button>
          )}
        </Flex>
      </Flex>
      <Collapse mt={2} isOpen={show}>
        <Stack>
          <Box>
            <Text textDecoration="underline">Description</Text>
            <Text>
              Anim pariatur cliche reprehenderit, enim eiusmod high life
              accusamus terry richardson ad squid. Nihil anim keffiyeh
              helvetica, craft beer labore wes anderson cred nesciunt sapiente
              ea proident.
            </Text>
          </Box>
          <Text fontSize="sm">Added: {date}</Text>
        </Stack>
      </Collapse>
    </PseudoBox>
  );
};
