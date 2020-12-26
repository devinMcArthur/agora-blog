import React from "react";
import styled from "styled-components";
import { DisplayStyleSnippetFragment } from "../../../generated/graphql";

type Props = {
  style: DisplayStyleSnippetFragment;
  children: React.ReactNode;
  key: string | number;
};

const InternalMentionTag = styled.a`
  text-decoration-line: none;

  &:visited {
    color: blue;
  }
`;

const InternalMention = (props: Props) => {
  return (
    <InternalMentionTag
      href={`/p/${props.style.value.page!.slug}`}
      key={props.key}
      title={props.style.value.page!.title}
    >
      {props.children}
    </InternalMentionTag>
  );
};

export default InternalMention;
