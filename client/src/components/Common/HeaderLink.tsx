import * as React from "react";
import { ChakraStyleProps, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

type Props = {
  children: React.ReactNode;
  link: string;
  title?: string;
} & ChakraStyleProps;

const HeaderLink = (props: Props) => {
  const { title, link, children, ...rest } = props;

  return (
    <Link
      as={RouterLink}
      to={link}
      title={title}
      margin={0}
      fontWeight="bold"
      fontSize="lg"
      {...rest}
    >
      {children}
    </Link>
  );
};

export default HeaderLink;
