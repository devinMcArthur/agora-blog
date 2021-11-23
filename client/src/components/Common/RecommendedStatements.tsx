import React from "react";

import { Box, Center, Text } from "@chakra-ui/layout";
import {
  StatementsFromQuestionQuery,
  useStatementsFromQuestionLazyQuery,
} from "../../generated/graphql";
import Statement from "../Statement";
import Loading from "./Loading";
import { Heading } from "@chakra-ui/react";

export interface IRecommendedStatements {
  questionId: string;
  avoidedPage?: string;
  optionButtons?: (statementId: string, pageSlug: string) => React.ReactNode;
  selectedStatement?: (statementId: string, pageSlug: string) => void;
}

const RecommendedStatements = ({
  questionId,
  avoidedPage,
  optionButtons,
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
        cursor={!optionButtons ? "pointer" : ""}
        onClick={() => {
          if (!optionButtons && selectedStatement)
            selectedStatement(statement._id, statement.page.slug);
        }}
      >
        <Box display="flex" flexDir="row" justifyContent="space-between">
          <Box>
            <Heading size="sm">{statement.page.title}</Heading>
            <Statement statement={statement} />
          </Box>
          {optionButtons && (
            <Box minHeight="100%" borderLeft="1px solid gray">
              {optionButtons(statement._id, statement.page.slug)}
            </Box>
          )}
        </Box>
      </Box>
    ));
  } else if (data?.statementsFromQuestion.length === 0) {
    content = (
      <Center>
        <Text
          fontWeight="bold"
          p={1}
          m={1}
          backgroundColor="white"
          borderRadius={4}
          w="100%"
          textAlign="center"
        >
          No statements found
        </Text>
      </Center>
    );
  }

  return <Box>{content}</Box>;
};

export default RecommendedStatements;
