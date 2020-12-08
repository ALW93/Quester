import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import multi from "redux-multi";
import rootReducer from "./actions/rootreducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = (initialState) => {
  return createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(thunk, multi))
  );
};

export default configureStore;
