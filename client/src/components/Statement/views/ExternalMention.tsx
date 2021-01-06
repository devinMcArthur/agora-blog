import React from "react";

import { DisplayStyleSnippetFragment } from "../../../generated/graphql";
import TextLink from "../../Common/TextLink";

type Props = {
  style: DisplayStyleSnippetFragment;
  children: React.ReactNode;
  key: string | number;
};

const ExternalMention = (props: Props) => {
  return (
    <TextLink link={props.style.value.url!} key={props.key} isExternal={true}>
      {props.children}
    </TextLink>
  );
};

export default ExternalMention;
