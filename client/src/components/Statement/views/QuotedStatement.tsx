import React from "react";

import { useStatementQuery } from "../../../generated/graphql";
import Statement from "..";
import { Text, Box, BoxProps } from "@chakra-ui/react";
import Loading from "../../Common/Loading";
import TextLink from "../../Common/TextLink";

interface IQuotedStatement extends BoxProps {
  statementID: string;
}

const QuotedStatement = ({ statementID, ...props }: IQuotedStatement) => {
  const { data, loading } = useStatementQuery({
    variables: { id: statementID },
  });

  return (
    <span>
      {!data && loading ? (
        <Loading />
      ) : (
        <Box as="span" {...props}>
          &quot;
          <Statement statement={data?.statement!} />
          <Text as="sup">
            [
            <TextLink
              title={data?.statement?.page.title}
              link={`/p/${data?.statement?.page.slug}`}
            >
              src
            </TextLink>
            ]
          </Text>
          &quot;
        </Box>
      )}
    </span>
  );
};

export default QuotedStatement;
