import React from "react";

import { Box, Heading, Text } from "@chakra-ui/layout";
import { useDrawer } from "..";
import ErrorMessage from "../../../components/Common/ErrorMessage";
import ParagraphEditProposalStatement from "../../../components/Common/ParagraphEditProposalStatement";
import QuestionTagRelated from "../../../components/Common/QuestionTagRelated";
import { Tag, TagLabel } from "@chakra-ui/tag";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { IconButton } from "@chakra-ui/button";

const DrawerEditProposalStatement = () => {
  const {
    state: { editProposalStatement, currentPageId },
  } = useDrawer();

  console.log(editProposalStatement);

  const hasEdit =
    editProposalStatement?.stringArray &&
    editProposalStatement.stringArray.length > 0
      ? true
      : false;

  const [statementVersion, setStatementVersion] = React.useState<
    number | "EDIT"
  >(hasEdit ? "EDIT" : editProposalStatement!.paragraphStatement!.versionIndex);

  React.useEffect(() => {
    if (editProposalStatement)
      setStatementVersion(
        hasEdit
          ? "EDIT"
          : editProposalStatement!.paragraphStatement!.versionIndex
      );
  }, [editProposalStatement, hasEdit]);

  const content = React.useMemo(() => {
    if (editProposalStatement) {
      const leftChevronDisabled =
        editProposalStatement.changeType === "ADD" || statementVersion === 0;
      const rightChevronDisabled =
        statementVersion === "EDIT" ||
        (!hasEdit &&
          editProposalStatement.paragraphStatement!.statement.versions.length -
            1 ===
            statementVersion);

      console.log(statementVersion);

      return (
        <Box p={3}>
          <Box backgroundColor="white" borderRadius="1em">
            <Box m={2} display="flex" flexDir="column">
              <Box p={2}>
                <ParagraphEditProposalStatement
                  statement={editProposalStatement}
                  versionIndex={statementVersion}
                />
              </Box>
              <Box
                display="flex"
                flexDir="row"
                justifyContent="space-between"
                w="100%"
              >
                <IconButton
                  as={FiChevronLeft}
                  aria-label="previous"
                  size="xs"
                  backgroundColor="transparent"
                  cursor="pointer"
                  _hover={{ backgroundColor: "white" }}
                  onClick={() => {
                    if (!leftChevronDisabled) {
                      if (
                        editProposalStatement.paragraphStatement &&
                        statementVersion === "EDIT"
                      )
                        setStatementVersion(
                          editProposalStatement.paragraphStatement.versionIndex
                        );
                      else if (statementVersion !== "EDIT")
                        setStatementVersion(statementVersion - 1);
                    }
                  }}
                  isDisabled={leftChevronDisabled}
                />
                <Text color="gray.500">
                  version:{" "}
                  {statementVersion === "EDIT" ? "NEW" : statementVersion + 1}
                </Text>
                <IconButton
                  as={FiChevronRight}
                  aria-label="next"
                  size="xs"
                  backgroundColor="transparent"
                  cursor="pointer"
                  _hover={{ backgroundColor: "white" }}
                  onClick={() => {
                    if (!rightChevronDisabled) {
                      if (
                        editProposalStatement.paragraphStatement!.statement
                          .versions.length -
                          1 ===
                        statementVersion
                      )
                        setStatementVersion("EDIT");
                      else
                        setStatementVersion((statementVersion as number) + 1);
                    }
                  }}
                  isDisabled={rightChevronDisabled}
                />
              </Box>
            </Box>
          </Box>

          <Heading size="md" my={2}>
            Questions
          </Heading>
          <QuestionTagRelated
            questions={editProposalStatement.questions}
            avoidPageId={currentPageId}
            onStatementSelect={(_, pageSlug) =>
              window.open(`/p/${pageSlug}`, "_blank")
            }
          />

          {editProposalStatement.newQuestions &&
            editProposalStatement.newQuestions.length > 0 && (
              <Box>
                <Heading size="md" my={2}>
                  New Questions
                </Heading>
                {editProposalStatement.newQuestions.map((newQuestion) => (
                  <Tag>
                    <TagLabel fontWeight="bold" my={2}>
                      {newQuestion}
                    </TagLabel>
                  </Tag>
                ))}
              </Box>
            )}
        </Box>
      );
    } else <ErrorMessage />;
  }, [currentPageId, editProposalStatement, hasEdit, statementVersion]);

  return <Box>{content}</Box>;
};

export default DrawerEditProposalStatement;
