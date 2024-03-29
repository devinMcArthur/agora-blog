import React from "react";

import { LinkProps } from "@chakra-ui/layout";
import { DisplayStyleSnippetFragment } from "../../../generated/graphql";
import TextLink from "../../Common/TextLink";

interface IExternalMention extends Omit<LinkProps, "style"> {
  style: DisplayStyleSnippetFragment;
}

const ExternalMention = ({ style, children, ...props }: IExternalMention) => {
  return (
    <TextLink link={style.value.url!} isExternal={true} {...props}>
      {children}
    </TextLink>
  );
};

export default ExternalMention;
