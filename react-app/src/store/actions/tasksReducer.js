const SET_TASKS = "Quester/tasks/SET_TASKS";
const ADD_TASK = "Quest/tasks/ADD_TASK";
const EXPIRE_TASK = "Quest/tasks/EXPIRE_TASK";
const DELETE_TASK = "Quest/tasks/DELETE_TASK";

const SET_EXPIRED = "Quest/tasks/SET_EXPIRED";
const ADD_EXPIRED = "Quest/tasks/ADD_EXPIRED";
const REVIVE_EXPIRED = "Quest/tasks/REVIVE_EXPIRED";
const DELETE_EXPIRED = "Quest/tasks/DELETE_EXPIRED";

const SET_COMPLETE = "QUEST/tasks/SET_COMPLETE";
const ADD_COMPLETE = "Quester/tasks/ADD_COMPLETE";
const DELETE_COMPLETE = "Quester/tasks/DELETE_COMPLETE";

export const setTasks = (data) => ({ type: SET_TASKS, data });
export const addTask = (task) => ({ type: ADD_TASK, task });
export const deleteTask = (payload) => ({ type: DELETE_TASK, payload });
export const expireTask = (payload) => ({ type: EXPIRE_TASK, payload });

export const setExpired = (data) => ({ type: SET_EXPIRED, data });
export const addExpired = (payload) => ({ type: ADD_EXPIRED, payload });
export const deleteExpired = (payload) => ({ type: DELETE_EXPIRED, payload });
export const reviveExpired = (payload) => ({ type: REVIVE_EXPIRED, payload });

export const setComplete = (data) => ({ type: SET_COMPLETE, data });
export const addComplete = (payload) => ({ type: ADD_COMPLETE, payload });
export const deleteComplete = (taskId) => ({ type: DELETE_COMPLETE, taskId });

// Get all tasks created by User
export const getTasks = (id) => async (dispatch) => {
  const response = await fetch(`/api/users/${id}/tasks`);
  const data = await response.json();
  if (data.tasks) {
    await dispatch(setTasks(data.tasks));
  }
  return data.tasks;
};

// Get all User's expired tasks
export const getExpired = (id) => async (dispatch) => {
  const response = await fetch(`/api/users/${id}/tasks/expired`);
  const data = await response.json();
  if (data.tasks) {
    await dispatch(setExpired(data.tasks));
  }
  return data.tasks;
};

// Get all User's completed tasks
export const getComplete = (id) => async (dispatch) => {
  const response = await fetch(`/api/users/${id}/tasks/complete`);
  const data = await response.json();
  if (data.tasks) {
    await dispatch(setComplete(data.tasks));
  }
  return data.tasks;
};

// Get Categories Associated with a Task
export const getTaskCategory = (id) => async (dispatch) => {
  if (id) {
    const response = await fetch(`/api/tasks/${id}/cat`);
    const data = await response.json();
    return data.categories;
  }
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
    return dispatch(addTask(payload));
  }
  return data;
};

// Delete a Task
export const removeTask = (taskId) => async (dispatch) => {
  const response = await fetch(`/api/tasks/${taskId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = response.json();
  if (data) {
    dispatch(deleteTask(taskId));
  }
  return data;
};

// Delete Completed Task
export const removeComplete = (taskId) => async (dispatch) => {
  const response = await fetch(`/api/tasks/${taskId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = response.json();

  if (data) {
    dispatch(deleteComplete(taskId));
  }
  return data;
};

// Delete Expired Task
export const removeExpired = (taskId) => async (dispatch) => {
  const response = await fetch(`/api/tasks/${taskId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = response.json();

  if (data) {
    dispatch(deleteExpired(taskId));
  }
  return data;
};

// Complete a Task
export const completeTask = (taskId, payload) => async (dispatch) => {
  const response = await fetch(`/api/tasks/${taskId}/complete`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });
  const data = response;

  if (data) {
    dispatch(deleteTask(taskId));
  }

  return data;
};

// Expire a Task
export const expire = (taskId, payload, taskData) => async (dispatch) => {
  const response = await fetch(`/api/tasks/${taskId}/expire`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });
  const data = response;
  if (data) {
    dispatch(deleteTask(taskId));
    dispatch(addExpired(taskData));
  }
  return data;
};

// Restore a Task
export const restoreTask = (taskId) => async (dispatch) => {
  console.log("restoring");
  const response = await fetch(`/api/tasks/${taskId}/restore`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  const data = await response.json();
  if (data) {
    dispatch(addTask(data));
    dispatch(deleteExpired(taskId));
    return data;
  }

  return data;
};

export const taskReducer = (
  state = { allTasks: [], expired: [], complete: [] },
  action
) => {
  switch (action.type) {
    case SET_TASKS: {
      return { ...state, allTasks: action.data };
    }
    case ADD_TASK: {
      const newTasks = [...state.allTasks, action.task];
      return { ...state, allTasks: newTasks };
    }
    case DELETE_TASK: {
      return {
        ...state,
        allTasks: state.allTasks.filter((task) => task.id !== action.payload),
      };
    }
    case SET_EXPIRED: {
      return { ...state, expired: action.data };
    }
    case ADD_EXPIRED: {
      const newExpired = [...state.expired, action.payload];
      return { ...state, expired: newExpired };
    }
    case DELETE_EXPIRED: {
      return {
        ...state,
        expired: state.expired.filter((task) => task.id !== action.payload),
      };
    }
    case SET_COMPLETE: {
      return { ...state, complete: action.data };
    }
    case ADD_COMPLETE: {
      const newComplete = [...state.complete, action.payload];
      return { ...state, complete: newComplete };
    }
    case DELETE_COMPLETE: {
      return {
        ...state,
        complete: state.complete.filter((task) => task.id !== action.taskId),
      };
    }
    default:
      return state;
  }
};
