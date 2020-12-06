import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from "redux-thunk"

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const reducer = combineReducers({});

const store = createStore(reducer, composeEnhancers(applyMiddleware(thunk)));

export default store;
