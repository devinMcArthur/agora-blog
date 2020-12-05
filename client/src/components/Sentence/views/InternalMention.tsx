import React from "react";
import styled from "styled-components";
import { PopulatedInternalMentionStyleType } from "../../../typescript/interfaces/documents/Sentence";

type Props = {
  style: PopulatedInternalMentionStyleType;
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
      href={`/p/${props.style.value.page.slug}`}
      key={props.key}
      title={props.style.value.page.title}
    >
      {props.children}
    </InternalMentionTag>
  );
};

export default InternalMention;
