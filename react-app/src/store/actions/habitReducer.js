const SET_HABITS = "Quester/habits/SET_HABITS";
const ADD_HABIT = "Quester/habits/ADD_HABIT";

export const setHabits = (payload) => ({ type: SET_HABITS, payload });
export const addHabit = (habit) => ({ type: ADD_HABIT, habit });

// Get all habits created by User
export const getHabits = (id) => async (dispatch) => {
  const response = await fetch(`/api/users/${id}/habits`);
  const data = await response.json();
  if (data.habits) {
    await dispatch(setHabits(data.habits));
  }
  return data.habits;
};

// Get Categories Associated with a Habit
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

// POST a new Habit
export const newHabit = (id, payload) => async (dispatch) => {
  const response = await fetch(`/api/users/${id}/habits`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  const data = await response.json();
  if (data) {
    return dispatch(addHabit(payload));
  }
  return data;
};

export const habitReducer = (state = { habits: [] }, action) => {
  switch (action.type) {
    case SET_HABITS: {
      return { ...state, habits: action.payload };
    }
    case ADD_HABIT: {
      const newHabits = [...state.habits, action.habit];
      return { ...state, habits: newHabits };
    }
    default:
      return state;
  }
};
