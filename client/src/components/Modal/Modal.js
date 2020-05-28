import React from 'react';
import {
  SlideIn,
  Modal as UIModal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  Divider,
  ModalCloseButton,
} from '@chakra-ui/core';

export const Modal = ({ isOpen, onClose, title, children }) => {
  return (
    <>
      <SlideIn in={isOpen}>
        {(styles) => (
          <UIModal onClose={onClose} isOpen={true} isCentered>
            <ModalOverlay opacity={styles.opacity} />
            <ModalContent pb={3} {...styles}>
              <ModalHeader>{title}</ModalHeader>
              <ModalCloseButton />
              <Divider />
              <ModalBody>{children}</ModalBody>
            </ModalContent>
          </UIModal>
        )}
      </SlideIn>
    </>
  );
};
