import { SET_AUTH, SET_ID, SET_USER } from "../actions/auth";

export default function reducer(state = { auth: false }, action) {
  switch (action.type) {
    case SET_AUTH: {
      return { ...state, auth: action.auth };
    }
    case SET_ID: {
      return { ...state, userId: action.id };
    }
    case SET_USER: {
      return { ...state, user: action.data };
    }
    default:
      return state;
  }
}
