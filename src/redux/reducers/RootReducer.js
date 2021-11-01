import { combineReducers } from "redux";
import postReducer from "./Post";

const rootReducer = combineReducers({
  posts: postReducer,
  // auth:   authReducer,
});

export default rootReducer;
