import React, { useReducer } from 'react';
import { useDisclosure } from '@chakra-ui/core';

export const AppContext = React.createContext();

const SET_TRANSACTIONS = 'SET_TRANSACTIONS';
const SET_TRANSACTION = 'SET_TRANSACTION';

const INITIAL_STATE = {
  transactions: [],
};

const TransactionsReducer = (state, action) => {
  switch (action.type) {
    case SET_TRANSACTION:
      return {
        ...state,
        transactions: [action.payload, ...state.transactions],
      };
    case SET_TRANSACTIONS:
      return {
        ...state,
        transactions: action.payload,
      };
    default:
      return state;
  }
};

export const AppContextProvider = ({ children }) => {
  const AddTrxDisclosure = useDisclosure();
  const [state, dispatch] = useReducer(TransactionsReducer, INITIAL_STATE);

  const setTransactions = (transactions) => {
    return dispatch({ type: SET_TRANSACTIONS, payload: transactions });
  };

  const addTransaction = (transaction) => {
    return dispatch({ type: SET_TRANSACTION, payload: transaction });
  };

  return (
    <AppContext.Provider
      value={{
        state,
        addTransaction,
        setTransactions,
        AddTrxDisclosure,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
