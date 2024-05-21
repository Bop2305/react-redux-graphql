import gql from "graphql-tag";
import { graphqlClient as client } from "../utils/graphqlClient";
import { People } from "./types/people";

export const getAllPeople = async (): Promise<People> => {
  const query = gql`
    query AllPeople {
      allPeople {
        people {
          id
          name
          birthYear
          gender
        }
      }
    }
  `;

  const res = await client.query({ query });

  return res.data.allPeople.people as People;
};
