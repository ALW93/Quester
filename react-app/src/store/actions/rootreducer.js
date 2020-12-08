import { combineReducers } from "redux";
import { authReducer } from "./authReducer";
import { avatarReducer } from "./avatarReducer";
import { utilityReducer } from "./utilityReducer";
import { taskReducer } from "./tasksReducer";
import { categoryReducer } from "./categoryReducer";

const rootReducer = combineReducers({
  session: authReducer,
  avatar: avatarReducer,
  utility: utilityReducer,
  tasks: taskReducer,
  categories: categoryReducer,
});

export default rootReducer;
