import { combineReducers, createStore } from "redux";
import counterReducer from "./reducers/counterReducer";

const store = createStore(combineReducers({ counter: counterReducer }));

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
