import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { avatarReducer } from "./avatarReducer";
import { utilityReducer } from "./utilityReducer";
import { taskReducer } from "./tasksReducer";
import { categoryReducer } from "./categoryReducer";
import { habitReducer } from "./habitReducer";
import { statReducer } from "./statReducer";

const rootReducer = combineReducers({
  session: authReducer,
  avatar: avatarReducer,
  utility: utilityReducer,
  tasks: taskReducer,
  categories: categoryReducer,
  habits: habitReducer,
  stats: statReducer,
});

export default rootReducer;
