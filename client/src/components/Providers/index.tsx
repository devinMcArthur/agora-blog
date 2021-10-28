import * as React from "react";

import ThemeProvider from "./ThemeProvider";
import { withRouter } from "react-router-dom";
import MyApolloProvider from "./ApolloProvider";
import { DrawerProvider } from "../../contexts/Drawer";

export default function Provider(props: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <MyApolloProvider>
        <DrawerProvider>{props.children}</DrawerProvider>
      </MyApolloProvider>
    </ThemeProvider>
  );
}

export function withProvider(WrappedComponent: any) {
  return withRouter(WrappedComponent);
}
