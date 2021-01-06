import React from "react";
import { DisplayStyleSnippetFragment } from "../../../generated/graphql";
import TextLink from "../../Common/TextLink";

type Props = {
  style: DisplayStyleSnippetFragment;
  children: React.ReactNode;
  key: string | number;
};

const InternalMention = (props: Props) => {
  return (
    <TextLink
      link={`/p/${props.style.value.page!.slug}`}
      title={props.style.value.page!.title}
    >
      {props.children}
    </TextLink>
  );
};

export default InternalMention;
