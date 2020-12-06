import { SET_AUTH } from "../actions/auth";

export default function reducer(state = { auth: false }, action) {
  switch (action.type) {
    case SET_AUTH: {
      return { ...state, auth: action.auth };
    }
    default:
      return state;
  }
}
