import React from "react";
import styled from "styled-components";
import { ExternalMentionStyleType } from "../../../typescript/interfaces/documents/Sentence";

type Props = {
  style: ExternalMentionStyleType;
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
      href={props.style.value.url}
      key={props.key}
      target="_blank"
      rel="noreferrer"
    >
      {props.children}
    </ExternalMentionTag>
  );
};

export default ExternalMention;
