import {
  Editable,
  EditableInput,
  EditablePreview,
  IconButton,
  Flex,
  Stack,
} from '@chakra-ui/core';
import React from 'react';

export const NameEditable = ({ fullName }) => {
  function EditableControls({ isEditing, onSubmit, onCancel, onRequestEdit }) {
    return isEditing ? (
      <Stack isInline spacing={2} mx={3}>
        <IconButton
          icon="check"
          size="sm"
          variantColor="green"
          onClick={onSubmit}
        />
        <IconButton
          icon="close"
          size="sm"
          variantColor="red"
          onClick={onCancel}
        />
      </Stack>
    ) : (
      <IconButton size="sm" icon="edit" onClick={onRequestEdit} />
    );
  }

  return (
    <Editable
      defaultValue={fullName}
      fontSize="2xl"
      isPreviewFocusable={false}
      submitOnBlur={false}
    >
      {(props) => (
        <Flex height={10} alignItems="center">
          <EditablePreview mr={2} />
          <EditableInput height={10} w="60%" />
          <EditableControls {...props} />
        </Flex>
      )}
    </Editable>
  );
};
