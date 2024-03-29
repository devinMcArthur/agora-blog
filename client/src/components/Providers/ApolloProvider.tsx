import * as React from "react";

import { createUploadLink } from "apollo-upload-client";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { localStorageTokenKey } from "../../contexts/Auth";
import useStorage from "../../hooks/useStorage";

export default function MyApolloProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { getItem } = useStorage();

  const httpLink = createUploadLink({
    uri: `${process.env.NEXT_PUBLIC_API_URL}`,
  });

  const authLink = setContext((_, { headers }) => {
    const token = getItem(localStorageTokenKey);

    return {
      headers: {
        ...headers,
        authorization: token || "",
      },
    };
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            pages: {
              keyArgs: [],
              merge: (existing = [], incoming) => {
                return [...existing, ...incoming];
              },
            },
            questions: {
              keyArgs: [],
              merge: (existing = [], incoming) => {
                return [...existing, ...incoming];
              },
            },
          },
        },
      },
    }),
    connectToDevTools: process.env.NODE_ENV === "development",
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
