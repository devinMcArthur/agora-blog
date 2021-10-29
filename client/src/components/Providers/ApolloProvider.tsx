import * as React from "react";

import { createUploadLink } from "apollo-upload-client";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { localStorageTokenKey } from "../../contexts/Auth";

export default function MyApolloProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const httpLink = createUploadLink({
    uri: `${process.env.REACT_APP_API_URL}`,
  });

  const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem(localStorageTokenKey);

    return {
      headers: {
        ...headers,
        authorization: token || "",
      },
    };
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
    connectToDevTools: process.env.NODE_ENV === "development",
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
