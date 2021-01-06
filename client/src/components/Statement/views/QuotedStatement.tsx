// import { SkeletonText } from "@chakra-ui/react";
import React from "react";
import { useStatementQuery } from "../../../generated/graphql";
import Statement from "..";
import { Text } from "@chakra-ui/react";
import Loading from "../../Common/Loading";
import TextLink from "../../Common/TextLink";

type Props = {
  statementID: string;
  key: string | number;
};

const QuotedStatement = (props: Props) => {
  const { data, loading } = useStatementQuery({
    variables: { id: props.statementID },
  });

  return (
    <span>
      {!data && loading ? (
        <Loading />
      ) : (
        <span style={{ borderBottom: "1px solid #E2E8F0" }}>
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
        </span>
      )}
    </span>
  );
};

export default QuotedStatement;
