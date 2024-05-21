import { Dispatch } from "redux";
import * as service from "./people.service";

// Action types
const SET_ALL_PEOPLE = "people/setAllPeople";

// Action creators
export const setAllPeople = (allPeople: any) => {
  return {
    type: SET_ALL_PEOPLE,
    payload: allPeople,
  };
};

export const getAllPeople = () => {
  return async (dispatch: Dispatch) => {
    const res = await service.getAllPeople();
    dispatch(setAllPeople(res));
    return res
  };
};

// Initial state
const initState = {
  allPeople: null,
};

// Reducer
export default (state = initState, action: { type: string; payload: any }) => {
  switch (action.type) {
    case SET_ALL_PEOPLE:
      return {
        ...state,
        allPeople: action.payload,
      };

    default:
      return state;
  }
};
