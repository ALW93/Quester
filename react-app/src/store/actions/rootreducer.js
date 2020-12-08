import { combineReducers } from "redux";
import { authReducer } from "./auth";
import { avatarReducer } from "./avatar";
import { utilityReducer } from "./utility";

const rootReducer = combineReducers({
  session: authReducer,
  avatar: avatarReducer,
  utility: utilityReducer,
});

export default rootReducer;
