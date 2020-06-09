export const INITIAL_STATE = {
  notes: [],
};

export const types = {
  SET_NOTES: 'SET_NOTES',
  SET_NOTE: ' SET_NOTE',
};

export const NoteReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.SET_NOTE:
      return {
        ...state,
        notes: [action.payload, ...state.notes],
      };
    case types.SET_NOTES:
      return {
        ...state,
        notes: action.payload,
      };
    default:
      return state;
  }
};
