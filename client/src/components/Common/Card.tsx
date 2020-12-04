import * as React from "react";

import Flex from "./Flex";

const Card = (props: { children: React.ReactNode; key: string }) => {
  return (
    <Flex
      flexDirection="column"
      border="1px solid grey"
      padding="0.5em"
      margin="0.5em"
      borderRadius="3px"
      width="100%"
      key={props.key}
    >
      {props.children}
    </Flex>
  );
};

export default Card;
