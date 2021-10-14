import React from "react";

import { Box, Center, Text } from "@chakra-ui/layout";
import {
  StatementsFromQuestionQuery,
  useStatementsFromQuestionLazyQuery,
} from "../../generated/graphql";
import Statement from "../Statement";
import Loading from "./Loading";
import { Heading } from "@chakra-ui/react";

interface IRecommendedStatements {
  questionId: string;
  avoidedPage?: string;
  selectedStatement: (statementId: string) => void;
}

const RecommendedStatements = ({
  questionId,
  avoidedPage,
  selectedStatement,
}: IRecommendedStatements) => {
  const [foundStatements, setFoundStatements] = React.useState<
    StatementsFromQuestionQuery["statementsFromQuestion"]
  >([]);
  const [getStatements, { data, loading }] =
    useStatementsFromQuestionLazyQuery();

  /**
   * ----- Use-effects and other logic -----
   */

  React.useEffect(() => {
    setFoundStatements([]);
    getStatements({
      variables: { questionId, options: { avoidPage: avoidedPage } },
    });
  }, [questionId, avoidedPage, getStatements]);

  React.useEffect(() => {
    if (!loading && data) {
      setFoundStatements(data.statementsFromQuestion);
    }
  }, [data, loading]);

  /**
   * ----- Rendering -----
   */

  let content: any = <Loading />;
  if (foundStatements.length > 0) {
    content = foundStatements.map((statement, index) => (
      <Box
        p={1}
        m={1}
        key={index}
        backgroundColor="white"
        borderRadius={4}
        cursor="pointer"
        onClick={() => selectedStatement(statement._id)}
      >
        <Heading size="sm">{statement.page.title}</Heading>
        <Statement statement={statement} />
      </Box>
    ));
  } else if (data?.statementsFromQuestion.length === 0) {
    content = (
      <Center>
        <Text fontWeight="bold">No recommendations found</Text>
      </Center>
    );
  }

  return <Box>{content}</Box>;
};

export default RecommendedStatements;
