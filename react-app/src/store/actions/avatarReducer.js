export const SET_AVATAR = "Quester/avatar/SET_AVATAR";

export const setAvatar = (data) => ({ type: SET_AVATAR, data });

// GET specific user avatar
export const getAvatar = (id) => async (dispatch) => {
  const response = await fetch(`/api/users/${id}/avatar`);
  const data = await response.json();
  if (data) {
    dispatch(setAvatar(data));
  }
  return data;
};

// POST new avatar for new user
export const createAvatar = async (id, data) => {
  const response = await fetch(`/api/users/${id}/avatar`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const res = await response.json();
  return res;
};

export const avatarReducer = (state = { avatar: {} }, action) => {
  switch (action.type) {
    case SET_AVATAR: {
      return { ...state, avatar: action.data };
    }
    default:
      return state;
  }
};
