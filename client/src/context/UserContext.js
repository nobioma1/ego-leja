import React, { useReducer } from 'react';

export const UserContext = React.createContext();

const SET_USER = 'SET_USER';

const INITIAL_STATE = {
  user: null,
};

const UserReducer = (state, action) => {
  switch (action.type) {
    case SET_USER:
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

  const setUser = (user) => {
    return dispatch({ type: SET_USER, payload: user });
  };

  return (
    <UserContext.Provider value={{ state, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
