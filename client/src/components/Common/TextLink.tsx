import * as React from "react";
import { Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

type Props = {
  children: React.ReactNode;
  link: string;
  title?: string;
  isExternal?: boolean;
};

const TextLink = (props: Props) => {
  const { title, link, children, isExternal } = props;

  const linkProps: any = {
    color: "blue.600",
  };

  if (isExternal) {
    linkProps.href = link;
    linkProps.title = title;
    linkProps.isExternal = true;
  } else {
    linkProps.as = RouterLink;
    linkProps.to = link;
    linkProps.title = title;
  }

  return <Link {...linkProps}>{children}</Link>;
};

export default TextLink;
