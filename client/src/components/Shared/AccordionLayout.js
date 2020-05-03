import React from 'react';
import {
  AccordionHeader,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Text,
} from '@chakra-ui/core';

export const AccordionLayout = ({ title, children, ...props }) => {
  return (
    <AccordionItem {...props}>
      <AccordionHeader>
        <Box flex="1" textAlign="left">
          <Text fontSize="xl">{title}</Text>
        </Box>
        <AccordionIcon />
      </AccordionHeader>
      <AccordionPanel pb={4}>{children}</AccordionPanel>
    </AccordionItem>
  );
};
