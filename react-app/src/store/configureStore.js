import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunk from "redux-thunk";
import auth from "./reducers/auth";
import util from "./reducers/utility";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const reducer = combineReducers({ auth, util });

const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

export default store;
