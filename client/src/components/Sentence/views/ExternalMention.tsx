import React from "react";
import styled from "styled-components";
import { DisplayStyleSnippetFragment } from "../../../generated/graphql";

type Props = {
  style: DisplayStyleSnippetFragment;
  children: React.ReactNode;
  key: string | number;
};

const ExternalMentionTag = styled.a`
  text-decoration-line: none;

  &:visited {
    color: blue;
  }
`;

const ExternalMention = (props: Props) => {
  return (
    <ExternalMentionTag
      href={props.style.value.url!}
      key={props.key}
      target="_blank"
      rel="noreferrer"
    >
      {props.children}
    </ExternalMentionTag>
  );
};

export default ExternalMention;
