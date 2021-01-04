import * as React from "react";

import ThemeProvider from "./ThemeProvider";
import { withRouter } from "react-router-dom";
import MyApolloProvider from "./ApolloProvider";

export default function Provider(props: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <MyApolloProvider>{props.children}</MyApolloProvider>
    </ThemeProvider>
  );
}

export function withProvider(WrappedComponent: any) {
  return withRouter(WrappedComponent);
}
