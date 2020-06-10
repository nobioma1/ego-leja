import React, { useReducer } from 'react';
import { useDisclosure, useToast } from '@chakra-ui/core';

import { INITIAL_STATE, types, NoteReducer } from './reducers/notes';

export const AppContext = React.createContext();

export const AppContextProvider = ({ children }) => {
  const AddNoteDisclosure = useDisclosure();
  const toast = useToast();
  const [state, dispatch] = useReducer(NoteReducer, INITIAL_STATE);

  const setNotes = (notes) => {
    return dispatch({ type: types.SET_NOTES, payload: notes });
  };

  const addNote = (note) => {
    return dispatch({ type: types.SET_NOTE, payload: note });
  };

  /**
   * Invoke useToast toast function
   *
   * @param { {title: string, description?: string, isError?: boolean } } info
   */

  const toaster = (info, isError = false) => {
    return toast({
      ...info,
      status: isError ? 'warning' : 'success',
      duration: 3000,
      position: 'top-right',
    });
  };

  return (
    <AppContext.Provider
      value={{
        state,
        addNote,
        setNotes,
        toaster,
        AddNoteDisclosure,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
