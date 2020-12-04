import * as React from "react";

import ThemeProvider from "./ThemeProvider";
import { withRouter } from "react-router-dom";

export default function Provider(props: { children: React.ReactNode }) {
  return <ThemeProvider>{props.children}</ThemeProvider>;
}

export function withProvider(WrappedComponent: any) {
  return withRouter(WrappedComponent);
}
