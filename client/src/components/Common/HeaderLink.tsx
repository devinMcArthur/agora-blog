import * as React from "react";
import { ChakraStyleProps, Link } from "@chakra-ui/react";
import TextLink from "./TextLink";

type Props = {
  children: React.ReactNode;
  link: string;
  title?: string;
} & ChakraStyleProps;

const HeaderLink = (props: Props) => {
  const { title, link, children, ...rest } = props;

  return (
    <TextLink
      link={link}
      title={title}
      margin={0}
      fontWeight="bold"
      fontSize="lg"
      {...rest}
    >
      {children}
    </TextLink>
  );
};

export default HeaderLink;
