const SET_TASKS = "Quester/tasks/SET_TASKS";
const ADD_TASK = "Quest/tasks/ADD_TASK";
const EDIT_TASK = "Quest/tasks/EDIT_TASK";
const DELETE_TASK = "Quest/tasks/DELETE_TASK";

export const setTasks = (data) => ({ type: SET_TASKS, data });
export const addTask = (task) => ({ type: ADD_TASK, task });

// Get all tasks created by User
export const getTasks = (id) => async (dispatch) => {
  const response = await fetch(`/api/users/${id}/tasks`);
  const data = await response.json();
  data.tasks.forEach(async (t) => {
    const info = await dispatch(getTaskCategory(t.id));
    t["categories"] = info;
  });
  console.log(data.tasks);
  if (data) {
    dispatch(setTasks(data.tasks));
  }
  return data.tasks;
};

// Get Categories Associated with a Task
export const getTaskCategory = (id) => async (dispatch) => {
  const response = await fetch(`/api/tasks/${id}/cat`);
  const data = await response.json();
  return data.categories;
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
  if (data) {
    dispatch(addTask(payload));
  }
  return data;
};

export const taskReducer = (state = { allTasks: [] }, action) => {
  switch (action.type) {
    case SET_TASKS: {
      return { ...state, allTasks: action.data };
    }
    case ADD_TASK: {
      const newTasks = [...state.allTasks, action.task];
      return { ...state, allTasks: newTasks };
    }
    default:
      return state;
  }
};
