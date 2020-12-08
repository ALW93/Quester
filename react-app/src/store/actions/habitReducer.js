const SET_HABITS = "Quester/habits/SET_HABITS";

export const setHabits = (payload) => ({ type: SET_HABITS, payload });

// Get all habits created by User
export const getHabits = (id) => async (dispatch) => {
  const response = await fetch(`/api/users/${id}/habits`);
  const data = await response.json();
  if (data) {
    await dispatch(setHabits(data.habits));
  }
  return data.habits;
};

export const habitReducer = (state = { habits: [] }, action) => {
  switch (action.type) {
    case SET_HABITS: {
      return { ...state, habits: action.payload };
    }
    default:
      return state;
  }
};
