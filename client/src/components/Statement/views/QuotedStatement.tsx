// import { SkeletonText } from "@chakra-ui/react";
import React from "react";
import { useStatementQuery } from "../../../generated/graphql";
import Statement from "..";
import { Text, Box, BoxProps } from "@chakra-ui/react";
import Loading from "../../Common/Loading";
import TextLink from "../../Common/TextLink";

interface IQuotedStatement extends BoxProps {
  statementID: string;
  key?: string | number;
}

const QuotedStatement = ({ statementID, key, ...props }: IQuotedStatement) => {
  const { data, loading } = useStatementQuery({
    variables: { id: statementID },
  });

  return (
    <span>
      {!data && loading ? (
        <Loading />
      ) : (
        <Box as="span" borderBottom="1px solid #E2E8F0" {...props}>
          "
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
          "
        </Box>
      )}
    </span>
  );
};

export default QuotedStatement;
