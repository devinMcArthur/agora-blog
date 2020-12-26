import * as React from "react";

import ThemeProvider from "./ThemeProvider";
import { withRouter } from "react-router-dom";
import MyApolloProvider from "./ApolloProvider";
import MyChakraProvider from "./ChakraProvider";

export default function Provider(props: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      {/* <MyChakraProvider> */}
      <MyApolloProvider>{props.children}</MyApolloProvider>
      {/* </MyChakraProvider> */}
    </ThemeProvider>
  );
}

export function withProvider(WrappedComponent: any) {
  return withRouter(WrappedComponent);
}
