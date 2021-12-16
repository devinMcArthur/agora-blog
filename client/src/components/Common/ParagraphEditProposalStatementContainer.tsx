import { IconButton } from "@chakra-ui/button";
import { Box, Heading, Text } from "@chakra-ui/layout";
import { Tag, TagLabel } from "@chakra-ui/tag";
import React from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { ParagraphEditProposalStatementSnippetFragment } from "../../generated/graphql";
import { EditProposalChangeTypes } from "../../models/paragraphEditProposal";
import ParagraphEditProposalStatement from "./ParagraphEditProposalStatement";
import QuestionTagRelated from "./QuestionTagRelated";

interface IParagraphEditProposalStatementContainer {
  editProposalStatement: ParagraphEditProposalStatementSnippetFragment;
  pageId: string;
}

const ParagraphEditProposalStatementContainer = ({
  editProposalStatement,
  pageId,
}: IParagraphEditProposalStatementContainer) => {
  /**
   * ----- Hook Initialization
   */

  const [expanded, setExpanded] = React.useState(false);

  /**
   * ----- Variables -----
   */

  const changeTypeString = React.useMemo(() => {
    switch (editProposalStatement.changeType) {
      case "EDIT":
        return "editted";
      case "REMOVE":
        return "removed";
      case "ADD":
        return "added";
    }
  }, [editProposalStatement.changeType]);

  const backgroundColor = React.useMemo(() => {
    switch (editProposalStatement.changeType) {
      case "EDIT":
        return "yellow.100";
      case "REMOVE":
        return "red.100";
      case "ADD":
        return "green.100";
    }

    return "white";
  }, [editProposalStatement.changeType]);

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

  // index used for ParagraphEditProposalStatement
  const finalIndex = React.useMemo(() => {
    return statementVersion === edittedVersionIndex ||
      statementVersion === undefined
      ? "EDIT"
      : statementVersion;
  }, [edittedVersionIndex, statementVersion]);

  /**
   * ----- Use-effects and other logic -----
   */

  // reset statementVersion to default if editProposalStatement changes
  React.useEffect(() => {
    if (editProposalStatement) setStatementVersion(defaultIndex);
  }, [defaultIndex, editProposalStatement, edittedVersionIndex, hasEdit]);

  /**
   * ----- Rendering -----
   */

  const expandedContent = React.useMemo(() => {
    if (expanded) {
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

      let rightChevronDisabled =
        statementVersion === undefined ||
        !editProposalStatement.paragraphStatement ||
        editProposalStatement.paragraphStatement!.statement.versions.length -
          1 <=
          statementVersion;
      if (
        statementVersion !== undefined &&
        edittedVersionIndex !== undefined &&
        statementVersion < edittedVersionIndex
      )
        rightChevronDisabled = false;

      return (
        <Box p={3}>
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
                if (!leftChevronDisabled && statementVersion !== undefined) {
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
                if (!rightChevronDisabled && statementVersion !== undefined) {
                  setStatementVersion(statementVersion + 1);
                }
              }}
              isDisabled={rightChevronDisabled}
            />
          </Box>

          {/* QUESTIONS */}
          <QuestionTagRelated
            questions={editProposalStatement.questions}
            avoidPageId={pageId}
            onStatementSelect={(_, pageSlug) =>
              window.open(`/p/${pageSlug}`, "_blank")
            }
          />

          {/* NEW QUESTIONS */}
          {editProposalStatement.newQuestions.length > 0 && (
            <>
              <Heading size="sm">New Questions</Heading>
              {editProposalStatement.newQuestions.map((newQuestion, index) => (
                <Tag m={1} key={index} backgroundColor="gray.300">
                  <TagLabel fontWeight="bold" my={2}>
                    {newQuestion}
                  </TagLabel>
                </Tag>
              ))}
            </>
          )}
        </Box>
      );
    } else return null;
  }, [
    editProposalStatement.changeType,
    editProposalStatement.newQuestions,
    editProposalStatement.paragraphStatement,
    editProposalStatement.questions,
    edittedVersionIndex,
    expanded,
    pageId,
    statementVersion,
  ]);

  return (
    <Box
      display="flex"
      flexDir="row"
      my={2}
      pr={2}
      backgroundColor={expanded ? "gray.200" : backgroundColor}
      borderRadius="0 1em 1em 0"
      cursor="pointer"
    >
      <Box flexShrink={0} width="5px" backgroundColor="gray.600" mr={4} />
      <Box my={2} w="100%">
        <Box
          display="flex"
          flexDir="column"
          p={expanded ? 3 : 2}
          w="100%"
          cursor="pointer"
          borderRadius="0 1em 1em 0"
          onClick={() => setExpanded(!expanded)}
          backgroundColor={backgroundColor}
        >
          <ParagraphEditProposalStatement
            statement={editProposalStatement}
            versionIndex={finalIndex}
          />
          {changeTypeString && (
            <Text size="xs" color="gray.600">
              {changeTypeString}
            </Text>
          )}
        </Box>
        {expandedContent}
      </Box>
    </Box>
  );
};

export default ParagraphEditProposalStatementContainer;
