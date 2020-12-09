import DateTime from "luxon/src/datetime.js";
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

// Get Categories Associated with a Task
export const getHabitCategory = (id) => async (dispatch) => {
  if (id) {
    const response = await fetch(`/api/habits/${id}/cat`);
    const data = await response.json();
    return data.categories;
  }
};

// Get checks for a specific habit
export const getHabitChecks = (habitId) => async (dispatch) => {
  const response = await fetch(`/api/habits/${habitId}/checks`);
  const data = await response.json();

  return data.checks;
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