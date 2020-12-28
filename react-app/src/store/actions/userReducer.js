const GET_FRIENDS = "Quester/user/GET_FRIENDS";
const GET_MESSAGES = "Quester/user/GET_MESSAGES";
const OPEN_MESSAGE = "Quester/user/OPEN_MESSAGE";

const setFriends = (payload) => ({ type: GET_FRIENDS, payload });
const setMessages = (payload) => ({ type: GET_MESSAGES, payload });
const openMessage = (payload) => ({ type: OPEN_MESSAGE, payload });

export const getUserFriends = (userId) => async (dispatch) => {
  const response = await fetch(`/api/users/${userId}/friends`);
  const data = await response.json();
  if (data) {
    await dispatch(setFriends(data.friends));
    return data;
  } else {
    console.error("Error Fetching User Friends");
  }
};

export const getUserMessages = (userId) => async (dispatch) => {
  const response = await fetch(`/api/users/${userId}/messages`);
  const data = await response.json();
  if (data) {
    await dispatch(setMessages(data.messages));
    return data;
  } else {
    console.error("Error Fetching User Messages");
  }
};

export const mailOpener = (msgId) => async (dispatch) => {
  const response = await fetch(`api/users/messages/${msgId}`);
  if (response.ok) {
    await dispatch(openMessage(msgId));
    return "success";
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
    case OPEN_MESSAGE: {
      return {
        ...state,
        messages: state.messages.map((msg) => {
          if (msg.id === action.payload) {
            msg.status = "read";
          }
          return msg;
        }),
      };
    }
    default:
      return state;
  }
};
