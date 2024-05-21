import { ApolloClient, HttpLink, InMemoryCache } from "apollo-boost";

const cache = new InMemoryCache();
export const graphqlClient = new ApolloClient({
  cache,
  link: new HttpLink({
    uri: "https://swapi-graphql.netlify.app/.netlify/functions/index",
  }),
});
