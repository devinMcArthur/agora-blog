import * as React from "react";
import { Link as ChakraLink } from "@chakra-ui/react";
import { LinkProps } from "@chakra-ui/layout";
import Link from "next/link";

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

  let content = (
    <Link href={link} passHref>
      <ChakraLink {...linkProps} {...rest}>
        {children}
      </ChakraLink>
    </Link>
  );
  if (isExternal) {
    content = (
      <ChakraLink href={link} title={title} isExternal {...linkProps} {...rest}>
        {children}
      </ChakraLink>
    );
  }

  return content;
};

export default TextLink;
