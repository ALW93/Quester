const SET_TASKS = "Quester/tasks/SET_TASKS";

export const setTasks = (data) => ({ type: SET_TASKS, data });

// Get all tasks created by User
export const getTasks = (id) => async (dispatch) => {
  const response = await fetch(`/api/users/${id}/tasks`);
  const data = await response.json();
  if (data) {
    dispatch(setTasks(data.tasks));
  }
  return data.tasks;
};

// POST a new task
export const newTask = (id, payload) => async (dispatch) => {
  const response = await fetch(`/api/users/${id}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  const data = await response.json();
  return data;
};

// Get All Categories User Has
export const getCategories = (id) => async (dispatch) => {
  const response = await fetch(`/api/users/${id}/categories`);
  const data = await response.json();
  console.log(data);
  return data;
};

// Get Categories Associated with a Task
export const getTaskCategory = (id) => async (dispatch) => {
  const response = await fetch(`/api/tasks/${id}/cat`);
  const data = await response.json();
  return data.categories;
};

export const taskReducer = (state = { allTasks: [] }, action) => {
  switch (action.type) {
    case SET_TASKS: {
      return { ...state, allTasks: action.data };
    }
    default:
      return state;
  }
};
