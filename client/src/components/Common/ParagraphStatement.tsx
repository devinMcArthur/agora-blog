import React from "react";

import { Box, Divider, Heading, Text } from "@chakra-ui/layout";

import Statement from "../Statement";
import { FullParagraphStatementSnippetFragment } from "../../generated/graphql";
import { IconButton } from "@chakra-ui/button";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import QuestionTagRelated from "./QuestionTagRelated";
import ParagraphEditProposal from "./ParagraphEditProposal";

interface IParagraphStatement {
  paragraphStatement: FullParagraphStatementSnippetFragment;
  pageId: string;
}

const ParagraphStatement = ({
  paragraphStatement,
  pageId,
}: IParagraphStatement) => {
  const [expanded, setExpanded] = React.useState(false);

  const [statementVersion, setStatementVersion] = React.useState(
    paragraphStatement.versionIndex
  );

  const expandedContent = React.useMemo(() => {
    if (expanded && paragraphStatement.statement.versions[statementVersion]) {
      const leftChevronEnabled = statementVersion !== 0;
      const rightChevronEnabled =
        statementVersion !== paragraphStatement.statement.versions.length - 1;

      return (
        <Box pt={2} pr={3}>
          <Box
            display="flex"
            flexDir="row"
            justifyContent="space-between"
            w="100%"
          >
            <IconButton
              onClick={() => {
                if (leftChevronEnabled)
                  setStatementVersion(statementVersion - 1);
              }}
              as={FiChevronLeft}
              aria-label="previous"
              size="xs"
              backgroundColor="transparent"
              cursor="pointer"
              isDisabled={!leftChevronEnabled}
              _hover={{ backgroundColor: "white" }}
            />
            <Text color="gray.500">version: {statementVersion + 1}</Text>
            <IconButton
              onClick={() => {
                if (rightChevronEnabled)
                  setStatementVersion(statementVersion + 1);
              }}
              as={FiChevronRight}
              aria-label="next"
              size="xs"
              backgroundColor="transparent"
              isDisabled={!rightChevronEnabled}
              cursor="pointer"
              _hover={{ backgroundColor: "white" }}
            />
          </Box>

          {/* QUESTIONS */}
          <QuestionTagRelated
            questions={
              paragraphStatement.statement.versions[statementVersion].questions
            }
            avoidPageId={pageId}
            onStatementSelect={(_, pageSlug) =>
              window.open(`/p/${pageSlug}`, "_blank")
            }
          />

          {/* EDIT PROPOSALS */}
          {paragraphStatement.statement.versions[statementVersion] &&
            !!paragraphStatement.statement.versions[statementVersion]
              .sourceEditProposal && (
              <Box>
                <Heading size="sm">Source</Heading>
                <ParagraphEditProposal
                  backgroundColor="gray.100"
                  paragraphEditProposalId={
                    paragraphStatement.statement.versions[statementVersion]
                      .sourceEditProposal!._id
                  }
                  previewLink
                />
              </Box>
            )}
        </Box>
      );
    } else return null;
  }, [
    expanded,
    pageId,
    paragraphStatement.statement.versions,
    statementVersion,
  ]);

  return (
    <Box
      display="flex"
      flexDir="row"
      my={2}
      pr={2}
      backgroundColor={expanded ? "gray.200" : "gray.100"}
      borderRadius="0 1em 1em 0"
    >
      <Box flexShrink={0} width="5px" backgroundColor="gray.600" mr={4} />
      <Box my={2} w="100%">
        <Box
          w="100%"
          cursor="pointer"
          p={2}
          borderRadius="1em"
          onClick={() => setExpanded(!expanded)}
          backgroundColor="gray.100"
        >
          <Statement
            statement={paragraphStatement.statement}
            versionIndex={statementVersion}
          />
        </Box>
        {expandedContent}
      </Box>
    </Box>
  );
};

export default ParagraphStatement;
