import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";

const link = createHttpLink({
  uri: process.env.API_URL,
});

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
  ssrMode: true,
});

export default client;
