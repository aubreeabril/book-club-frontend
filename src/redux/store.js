import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import bookReducer from "./reducers";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  bookReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
