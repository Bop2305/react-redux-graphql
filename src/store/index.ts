import { applyMiddleware, combineReducers, createStore } from "redux";
import counterReducer from "./reducers/counterReducer";
import peopleDuck, { getAllPeople } from "./people.duck";
import { thunk } from "redux-thunk";

const rootReducer = combineReducers({
  counter: counterReducer,
  people: peopleDuck,
});

const store = createStore(rootReducer, applyMiddleware(thunk))

store.dispatch(getAllPeople())

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {counter: CounterState, people: PeopleState}
export type AppDispatch = typeof store.dispatch;

export default store;
