const SET_TASKS = "Quester/tasks/SET_TASKS";

export const setTasks = (data) => ({ type: SET_TASKS, data });

// Get all tasks created by User
export const getTasks = (id) => async (dispatch) => {
  const response = await fetch(`/api/users/${id}/tasks`);
  const data = await response.json();
  if (data) {
    dispatch(setTasks(data));
  }
  return data;
};

export const taskReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_TASKS: {
      return { ...state, tasks: action.data };
    }
    default:
      return state;
  }
};
