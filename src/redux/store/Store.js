import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import RootReducer from "../reducers/RootReducer";

const store = createStore(
  RootReducer,
  {},
  compose(applyMiddleware(thunk), composeWithDevTools())
);

export default store;
