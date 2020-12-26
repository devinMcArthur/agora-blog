// import { SkeletonText } from "@chakra-ui/react";
import React from "react";
import styled from "styled-components";
import { useStatementQuery } from "../../../generated/graphql";
import Statement from "..";

type Props = {
  statementID: string;
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

const QuotedStatement = (props: Props) => {
  const { data, loading } = useStatementQuery({
    variables: { id: props.statementID },
  });

  return (
    <span>
      {!data && loading ? (
        <div />
      ) : (
        <QuoteTag>
          <Statement statement={data?.statement!} />
          <sup>
            [
            <SourceLink
              title={data?.statement?.page.title}
              href={`/p/${data?.statement?.page.slug}`}
            >
              src
            </SourceLink>
            ]
          </sup>
        </QuoteTag>
      )}
    </span>
  );
};

export default QuotedStatement;
