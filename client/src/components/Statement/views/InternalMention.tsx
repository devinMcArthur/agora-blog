import { LinkProps } from "@chakra-ui/layout";
import React from "react";
import { DisplayStyleSnippetFragment } from "../../../generated/graphql";
import TextLink from "../../Common/TextLink";

interface IInternalMention extends Omit<LinkProps, "style"> {
  style: DisplayStyleSnippetFragment;
  children: React.ReactNode;
  key: string | number;
}

const InternalMention = ({ style, ...props }: IInternalMention) => {
  return (
    <TextLink
      link={`/p/${style.value.page!.slug}`}
      title={style.value.page!.title}
    >
      {props.children}
    </TextLink>
  );
};

export default InternalMention;
