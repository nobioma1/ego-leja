import React from 'react';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from '@chakra-ui/core';
import { MdMore } from 'react-icons/md';

export const AddTransactionMenu = ({ borrowingOnOpen, creditOnOpen }) => {
  const addBorrowingBtnRef = React.useRef();
  const addCreditBtnRef = React.useRef();

  return (
    <Menu autoSelect={false}>
      <MenuButton
        as={IconButton}
        variant="ghost"
        aria-label="Actions"
        fontSize="20px"
        icon={MdMore}
      />
      <MenuList placement="bottom-end">
        <MenuItem
          ref={addBorrowingBtnRef}
          variant="ghost"
          onClick={borrowingOnOpen}
        >
          Add Borrowing
        </MenuItem>
        <MenuItem ref={addCreditBtnRef} variant="ghost" onClick={creditOnOpen}>
          Add Credit
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
