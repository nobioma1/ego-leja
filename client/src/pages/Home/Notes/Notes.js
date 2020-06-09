import React, { useState, useEffect, useContext } from 'react';
import { Box, Text, Button, Flex } from '@chakra-ui/core';

import { HomeContentLayout } from 'components/Layout';
import { useRequest } from 'hooks/useRequest';
import { Filters } from 'components/Filters';
import { AppContext } from 'context/AppContext';
import { NoteCard } from 'components/Notes';

export const Notes = () => {
  const filters = ['All', 'Lendings', 'Borrowings', 'Bad Debt'];
  const [activeFilter, setActiveFilter] = useState(0);
  const {
    state: { notes },
    AddNoteDisclosure: { onOpen },
    setNotes,
  } = useContext(AppContext);

  const { doRequest } = useRequest({
    method: 'get',
    url: '/api/records',
  });

  useEffect(() => {
    doRequest({
      onSuccess: (notes) => {
        setNotes(notes);
      },
    });
  }, []);

  return (
    <HomeContentLayout title="Your Notes">
      <Flex
        justifyContent="space-between"
        flexDirection={['column', 'column', 'row']}
        py={3}
      >
        <Filters
          filters={filters}
          setActive={setActiveFilter}
          isActive={activeFilter}
        />
        <Button
          leftIcon="add"
          variantColor="green"
          variant="solid"
          size="sm"
          onClick={onOpen}
        >
          Add Note
        </Button>
      </Flex>
      <Box h="80vh" overflowY="auto">
        {notes.length > 0 ? (
          notes.map((note) => (
            <Box key={note.id}>
              <NoteCard note={note} />
            </Box>
          ))
        ) : (
          <Text textAlign="center" my={5} fontSize="lg" opacity={0.8}>
            You don't have any notes, Add Note...
          </Text>
        )}
      </Box>
    </HomeContentLayout>
  );
};
