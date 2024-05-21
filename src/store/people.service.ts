import gql from "graphql-tag";
import { graphqlClient as client } from "../utils/graphqlClient";

export const getAllPeople = async () => {
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

  return res.data;
};
