import React from "react";

import { Box, Heading, Text } from "@chakra-ui/layout";
import { IconButton } from "@chakra-ui/button";
import { useDrawer } from "..";
import ErrorMessage from "../../../components/Common/ErrorMessage";
import Statement from "../../../components/Statement";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import Loading from "../../../components/Common/Loading";
import QuestionTagRelated from "../../../components/Common/QuestionTagRelated";

const DrawerParagraphStatement = () => {
  const {
    state: { paragraphStatement, currentPageId },
  } = useDrawer();

  const [statementVersion, setStatementVersion] = React.useState(
    paragraphStatement!.versionIndex
  );

  React.useEffect(() => {
    if (!!paragraphStatement)
      setStatementVersion(paragraphStatement.versionIndex);
  }, [paragraphStatement]);

  const content = React.useMemo(() => {
    if (
      paragraphStatement &&
      paragraphStatement.statement.versions[statementVersion]
    ) {
      const statement = paragraphStatement.statement;

      return (
        <Box p={3}>
          {/* STATEMENT DISPLAY */}
          <Box backgroundColor="white" borderRadius="1em">
            <Box m={2} display="flex" flexDir="column">
              <Box p={2}>
                <Statement
                  statement={statement}
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
                  onClick={() => {
                    if (statementVersion !== 0)
                      setStatementVersion(statementVersion - 1);
                  }}
                  as={FiChevronLeft}
                  aria-label="previous"
                  size="xs"
                  backgroundColor="transparent"
                  cursor="pointer"
                  isDisabled={statementVersion === 0}
                  _hover={{ backgroundColor: "white" }}
                />
                <Text color="gray.500">version: {statementVersion + 1}</Text>
                <IconButton
                  onClick={() => {
                    if (
                      statementVersion !==
                      paragraphStatement.statement.versions.length - 1
                    )
                      setStatementVersion(statementVersion + 1);
                  }}
                  as={FiChevronRight}
                  aria-label="next"
                  size="xs"
                  backgroundColor="transparent"
                  isDisabled={
                    statementVersion ===
                    paragraphStatement.statement.versions.length - 1
                  }
                  cursor="pointer"
                  _hover={{ backgroundColor: "white" }}
                />
              </Box>
            </Box>
          </Box>

          {/* QUESTIONS */}
          <Heading size="md" my={2}>
            Questions
          </Heading>
          <QuestionTagRelated
            questions={
              paragraphStatement.statement.versions[statementVersion].questions
            }
            avoidPageId={currentPageId}
            onStatementSelect={(_, pageSlug) =>
              window.open(`/p/${pageSlug}`, "_blank")
            }
          />
        </Box>
      );
    } else if (paragraphStatement) {
      return <Loading />;
    } else return <ErrorMessage />;
  }, [paragraphStatement, statementVersion, currentPageId]);

  return <Box>{content}</Box>;
};

export default DrawerParagraphStatement;
