import React, { useReducer } from 'react';

export const UserContext = React.createContext();

export const userTypes = {
  setUser: 'SET_USER',
};

const INITIAL_STATE = {
  isLoading: false,
  isLoggedIn: false,
  user: null,
};

const UserReducer = (state, action) => {
  switch (action.type) {
    case userTypes.setUser:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(UserReducer, INITIAL_STATE);
  return (
    <UserContext.Provider value={[state, dispatch]}>
      {children}
    </UserContext.Provider>
  );
};
