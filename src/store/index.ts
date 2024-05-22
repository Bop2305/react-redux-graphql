import { applyMiddleware, combineReducers, createStore } from "redux";
import counterReducer from "./reducers/counterReducer";
import peopleDuck from "./people.duck";
import { thunk } from "redux-thunk";

const _rootReducer = {
  counter: counterReducer,
  people: peopleDuck,
};

const store = createStore(
  combineReducers(_rootReducer),
  applyMiddleware(thunk)
);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {counter: CounterState, people: PeopleState}
export type AppDispatch = typeof store.dispatch;

export default store;
