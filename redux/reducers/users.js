const initialState = {
  currentUser: null,
};

export const usersReducer = (state = initialState, action) => {
  return {
    ...state,
    currentUser: action.currentUser,
  };
};
