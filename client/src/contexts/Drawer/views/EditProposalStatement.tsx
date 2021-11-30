import React from "react";

import { Box, Heading, Text } from "@chakra-ui/layout";
import { useDrawer } from "..";
import ErrorMessage from "../../../components/Common/ErrorMessage";
import ParagraphEditProposalStatement from "../../../components/Common/ParagraphEditProposalStatement";
import QuestionTagRelated from "../../../components/Common/QuestionTagRelated";
import { Tag, TagLabel } from "@chakra-ui/tag";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { IconButton } from "@chakra-ui/button";
import { EditProposalChangeTypes } from "../../../models/paragraphEditProposal";

/**
 * @description handles drawer view of an edit proposal statement
 */

const DrawerEditProposalStatement = () => {
  /**
   * ----- Hook Initialization -----
   */

  const {
    state: { editProposalStatement, currentPageId },
  } = useDrawer();

  /**
   * ----- Variables -----
   */

  /**
   * @desc boolean representing whether this statement has some sort of change
   */
  const hasEdit = React.useMemo(() => {
    return editProposalStatement?.changeType === EditProposalChangeTypes.EDIT ||
      editProposalStatement?.changeType === EditProposalChangeTypes.ADD
      ? true
      : false;
  }, [editProposalStatement?.changeType]);

  /**
   * @desc if this is an accepted or outdated proposal and this statement has been edited,
   *       this is the index that was edited
   */
  const edittedVersionIndex = React.useMemo(() => {
    if (!hasEdit) return undefined;
    else if (editProposalStatement?.paragraphStatement)
      return editProposalStatement.paragraphStatement.versionIndex + 1;
    else return undefined;
  }, [editProposalStatement?.paragraphStatement, hasEdit]);

  const defaultIndex = React.useMemo(() => {
    if (edittedVersionIndex !== undefined) return edittedVersionIndex;
    else if (editProposalStatement?.paragraphStatement)
      return editProposalStatement.paragraphStatement.versionIndex;
    else return undefined;
  }, [editProposalStatement?.paragraphStatement, edittedVersionIndex]);

  /**
   * @desc state value holding the currently rendered version, undefined if there are no other version (ADDED)
   */
  const [statementVersion, setStatementVersion] = React.useState<
    number | undefined
  >(defaultIndex);

  /**
   * ----- Use-effects and other logic -----
   */

  // reset statementVersion to default if editProposalStatement changes
  React.useEffect(() => {
    console.log("hi", defaultIndex);
    if (editProposalStatement) setStatementVersion(defaultIndex);
  }, [defaultIndex, editProposalStatement, edittedVersionIndex, hasEdit]);

  /**
   * ----- Rendering -----
   */

  const content = React.useMemo(() => {
    if (editProposalStatement) {
      // disable left chevron if this statement is newly added or we are at index 0
      const leftChevronDisabled =
        statementVersion === undefined ||
        editProposalStatement.changeType === "ADD" ||
        statementVersion === 0;

      /**
       * disable right chevron if:
       *  - statement version is undefined
       *  - there are no other versions
       *  - we are at the end of the versions array
       */
      const rightChevronDisabled =
        statementVersion === undefined ||
        !editProposalStatement.paragraphStatement ||
        editProposalStatement.paragraphStatement!.statement.versions.length -
          1 ===
          statementVersion;

      // index used for ParagraphEditProposalStatement
      const finalIndex =
        statementVersion === edittedVersionIndex ||
        statementVersion === undefined
          ? "EDIT"
          : statementVersion;

      return (
        <Box p={3}>
          <Box backgroundColor="white" borderRadius="1em">
            <Box m={2} display="flex" flexDir="column">
              <Box p={2}>
                {(finalIndex === "EDIT" ||
                  editProposalStatement.paragraphStatement?.statement.versions[
                    finalIndex
                  ]) && (
                  <ParagraphEditProposalStatement
                    statement={editProposalStatement}
                    versionIndex={finalIndex}
                  />
                )}
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
                    if (
                      !leftChevronDisabled &&
                      statementVersion !== undefined
                    ) {
                      setStatementVersion(statementVersion - 1);
                    }
                  }}
                  isDisabled={leftChevronDisabled}
                />
                <Text color="gray.500">
                  version:{" "}
                  {statementVersion === edittedVersionIndex ||
                  statementVersion === undefined
                    ? "EDIT"
                    : statementVersion + 1}
                </Text>
                <IconButton
                  as={FiChevronRight}
                  aria-label="next"
                  size="xs"
                  backgroundColor="transparent"
                  cursor="pointer"
                  _hover={{ backgroundColor: "white" }}
                  onClick={() => {
                    if (
                      !rightChevronDisabled &&
                      statementVersion !== undefined
                    ) {
                      setStatementVersion(statementVersion + 1);
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
                {editProposalStatement.newQuestions.map(
                  (newQuestion, index) => (
                    <Tag key={index}>
                      <TagLabel fontWeight="bold" my={2}>
                        {newQuestion}
                      </TagLabel>
                    </Tag>
                  )
                )}
              </Box>
            )}
        </Box>
      );
    } else <ErrorMessage />;
  }, [
    currentPageId,
    editProposalStatement,
    edittedVersionIndex,
    statementVersion,
  ]);

  return <Box>{content}</Box>;
};

export default DrawerEditProposalStatement;
