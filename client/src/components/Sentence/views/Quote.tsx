import React from "react";
import styled from "styled-components";
import { PopulatedQuoteStyleType } from "../../../typescript/interfaces/documents/Sentence";

type Props = {
  style: PopulatedQuoteStyleType;
  children: React.ReactNode;
  key: string | number;
};

const QuoteTag = styled.span`
  ${(props) => `border-bottom: 1px solid ${props.theme.colors.greyLight}`}
`;

const SourceLink = styled.a`
  text-decoration-line: none;

  &:visited {
    color: blue;
  }
`;

const Quote = (props: Props) => {
  return (
    <QuoteTag key={props.key}>
      <q>{props.children}</q>
      <sup>
        [
        <SourceLink
          title={props.style.value.page.title}
          href={`/p/${props.style.value.page.slug}`}
        >
          src
        </SourceLink>
        ]
      </sup>
    </QuoteTag>
  );
};

export default Quote;
