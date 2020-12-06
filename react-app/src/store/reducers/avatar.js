import { SET_AVATAR } from "../actions/avatar";

export default function reducer(state = {}, action) {
  switch (action.type) {
    case SET_AVATAR: {
      return { ...state, avatar: action.data };
    }
    default:
      return state;
  }
}
