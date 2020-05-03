import React from 'react';
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/core';
import { LendingsTab } from './LendingsTab';
import { BorrowingsTab } from './BorrowingsTab';
import { TotalTab } from './TotalTab';

export const DetailTabs = () => {
  return (
    <Tabs variantColor="green" isFitted>
      <TabList mb="2em">
        <Tab _focus={{ outline: 'none' }}>Lendings</Tab>
        <Tab _focus={{ outline: 'none' }}>Borrowings</Tab>
        <Tab _focus={{ outline: 'none' }}>Total</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <LendingsTab />
        </TabPanel>
        <TabPanel>
          <BorrowingsTab />
        </TabPanel>
        <TabPanel>
          <TotalTab />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};
