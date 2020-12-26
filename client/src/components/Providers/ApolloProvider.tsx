import * as React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

export default function MyApolloProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const client = new ApolloClient({
    uri: process.env.API_URL,
    cache: new InMemoryCache(),
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
