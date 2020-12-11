const GET_FRIENDS = "Quester/user/GET_FRIENDS";
const GET_MESSAGES = "Quester/user/GET_MESSAGES";

const setFriends = (payload) => ({ type: GET_FRIENDS, payload });
const setMessages = (payload) => ({ type: GET_MESSAGES, payload });

export const getUserFriends = (userId) => async (dispatch) => {
  const response = await fetch(`/api/users/${userId}/friends`);
  const data = response.json();
  if (data) {
    await dispatch(setFriends(data));
    return data;
  } else {
    console.error("Error Fetching User Friends");
  }
};

export const getUserMessages = (userId) => async (dispatch) => {
  const response = await fetch(`/api/users/${userId}/messages`);
  const data = response.json();
  if (data) {
    await dispatch(setMessages(data));
    return data;
  } else {
    console.error("Error Fetching User Messages");
  }
};

export const userReducer = (state = { friends: [], messages: [] }, action) => {
  switch (action.type) {
    case GET_FRIENDS: {
      return { ...state, friends: action.payload };
    }
    case GET_MESSAGES: {
      return { ...state, messages: action.payload };
    }
    default:
      return state;
  }
};
