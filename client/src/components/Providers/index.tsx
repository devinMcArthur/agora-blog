import * as React from "react";

import ThemeProvider from "./ThemeProvider";
import MyApolloProvider from "./ApolloProvider";
import { AuthProvider } from "../../contexts/Auth";
import MyDndProvider from "./DndProvider";

export default function Provider(props: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <MyApolloProvider>
        <MyDndProvider>
          <AuthProvider>{props.children}</AuthProvider>
        </MyDndProvider>
      </MyApolloProvider>
    </ThemeProvider>
  );
}

export function withProvider(WrappedComponent: any) {
  return WrappedComponent;
}
