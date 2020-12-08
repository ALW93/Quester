import { combineReducers } from "redux";
import { authReducer } from "./auth";
import { avatarReducer } from "./avatar";
import { utilityReducer } from "./utility";
import { taskReducer } from "./tasks";

const rootReducer = combineReducers({
  session: authReducer,
  avatar: avatarReducer,
  utility: utilityReducer,
  tasks: taskReducer,
});

export default rootReducer;
