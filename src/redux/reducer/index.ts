import { combineReducers } from "redux";
import { getUserDataReducer } from "./authReducer";
import { classReducer } from "./classReducer";
import { subjectReducer } from "./subjectReducer";

export const rootReducer = combineReducers({
  user: getUserDataReducer,
  classData: classReducer,
  subjectData: subjectReducer,
});
