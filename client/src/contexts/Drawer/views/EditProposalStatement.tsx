import React from "react";

import { Box, Heading } from "@chakra-ui/layout";
import { useDrawer } from "..";
import ErrorMessage from "../../../components/Common/ErrorMessage";
import ParagraphEditProposalStatement from "../../../components/Common/ParagraphEditProposalStatement";
import QuestionTagRelated from "../../../components/Common/QuestionTagRelated";

const DrawerEditProposalStatement = () => {
  const {
    state: { editProposalStatement, currentPageId },
  } = useDrawer();

  const content = React.useMemo(() => {
    if (editProposalStatement) {
      return (
        <Box p={3}>
          <Box backgroundColor="white" borderRadius="1em">
            <Box p={2}>
              <ParagraphEditProposalStatement
                statement={editProposalStatement}
              />
            </Box>
          </Box>

          <Heading size="md">Questions</Heading>
          <QuestionTagRelated
            questions={editProposalStatement.questions}
            avoidPageId={currentPageId}
            onStatementSelect={(_, pageSlug) =>
              window.open(`/p/${pageSlug}`, "_blank")
            }
          />
        </Box>
      );
    } else <ErrorMessage />;
  }, [currentPageId, editProposalStatement]);

  return <Box>{content}</Box>;
};

export default DrawerEditProposalStatement;
