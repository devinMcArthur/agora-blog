import * as React from "react";
import { Link } from "@chakra-ui/react";
import { LinkProps } from "@chakra-ui/layout";
import { Link as RouterLink } from "react-router-dom";

interface ITextLink extends LinkProps {
  children: React.ReactNode;
  link: string;
  title?: string;
  isExternal?: boolean;
}

const TextLink = ({
  title,
  link,
  children,
  isExternal,
  ...rest
}: ITextLink) => {
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

  return (
    <Link {...linkProps} {...rest}>
      {children}
    </Link>
  );
};

export default TextLink;
