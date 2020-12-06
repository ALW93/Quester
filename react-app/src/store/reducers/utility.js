import { SHOW_FORM } from "../actions/utility";

export default function reducer(state = { visible: false }, action) {
  switch (action.type) {
    case SHOW_FORM: {
      return { ...state, visible: action.open };
    }
    default:
      return state;
  }
}
