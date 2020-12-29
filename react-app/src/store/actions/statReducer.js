const SET_STATS = "Quester/stats/SET_STATS";

export const setStats = (payload) => ({ type: SET_STATS, payload });

// Get User's Stats
export const getStats = (id) => async (dispatch) => {
  const response = await fetch(`/api/users/${id}/stats`);
  const data = await response.json();
  if (data) {
    await dispatch(setStats(data.stats));
  }
  return data.stats;
};

// Create Base Stats for New User
export const createBase = (id) => async (dispatch) => {
  console.log("creating stats");
  const response = await fetch(`/api/users/${id}/stats`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    console.log("success");
    return "Success";
  } else {
    console.log("something went wrong creating stats");
  }
};

export const statReducer = (state = { stats: [] }, action) => {
  switch (action.type) {
    case SET_STATS: {
      return { ...state, stats: action.payload };
    }
    default:
      return state;
  }
};
