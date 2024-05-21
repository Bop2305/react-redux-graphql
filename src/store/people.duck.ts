import { Action, Reducer } from "redux";
import { People } from "./types/people";
import * as service from "./people.service";

const GET_ALL_PEOPLE = "people/getAllPeople";

export const getAllPeople: Reducer<any, Action> = ({ state = [], action }) => {
  console.log("[getAllPeople]");
  switch (action.type) {
    case GET_ALL_PEOPLE:
      async () => {
        const res = await service.getAllPeople();

        return res;
      };

      break;

    default:
      state;
  }
};
