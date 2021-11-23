import React from "react";
import { RenderElementProps } from "slate-react";

import { Box, BoxProps, Heading, Text } from "@chakra-ui/layout";
import { Button, ButtonGroup, IconButton } from "@chakra-ui/button";
import { Tooltip } from "@chakra-ui/tooltip";
import { FiChevronsDown, FiChevronsUp, FiPlus, FiStar } from "react-icons/fi";
import { CustomEditor } from "../utils";
import { Editor } from "slate";
import { StatementElementType } from "../../../../models/slate";
import {
  Tag,
  TagLabel,
  TagCloseButton,
  TagLeftIcon,
  Icon,
} from "@chakra-ui/react";
import QuestionSearch from "../../QuestionSearch";
import RecommendedStatements from "../../RecommendedStatements";
import QuotedStatement from "../../../Statement/views/QuotedStatement";
import { CloseButton } from "@chakra-ui/close-button";
import { useRichText } from "../../../../contexts/RichText";

enum Form {
  Question = "Question",
}

interface IStatementElement extends RenderElementProps {
  element: StatementElementType;
  editor: Editor;
  pageId?: string;
}

const StatementElement = ({
  attributes,
  children,
  element,
  editor,
  pageId,
}: IStatementElement) => {
  const { savedSelection } = useRichText();
  const [form, setForm] = React.useState<Form>();
  const [selectedQuestionId, setSelectedQuestionId] = React.useState<string>();

  /**
   * ----- Functions -----
   */

  const toggleQuestionForm = () => {
    if (form === Form.Question) {
      // Toggle form off

      setForm(undefined);
    } else {
      // Toggle form on

      setForm(Form.Question);
    }
  };

  const toggleQuestion = (questionId?: string) => {
    if (questionId) {
      // Toggle question on

      setForm(undefined);

      if (questionId === selectedQuestionId) setSelectedQuestionId(undefined);
      else setSelectedQuestionId(questionId);
    } else {
      setSelectedQuestionId(undefined);
    }
  };

  const statementSelected = (statementId: string) => {
    toggleQuestion();

    CustomEditor.setInlineQuote(editor, statementId, element.index);
  };

  const fullQuoteSelected = (quotedStatementId: string) => {
    toggleQuestion();

    CustomEditor.setFullQuote(editor, quotedStatementId, element.index);
  };

  const questionSelected = (question: { _id: string; question: string }) => {
    toggleQuestionForm();

    CustomEditor.addQuestion(editor, element.index, question);

    setSelectedQuestionId(question._id);
  };

  const questionSubmitted = (question: string) => {
    toggleQuestionForm();

    CustomEditor.addNewQuestion(editor, element.index, question);
  };

  /**
   * ----- Variables -----
   */

  const focused = React.useMemo(() => {
    return (
      element.index === savedSelection?.slateSelection?.anchor.path[0] ||
      element.index === editor.selection?.anchor.path[0] ||
      element.statementId === document.activeElement?.id
    );
  }, [
    editor.selection?.anchor.path,
    element.index,
    element.statementId,
    savedSelection?.slateSelection?.anchor.path,
  ]);

  /**
   * ----- Render -----
   */

  const focusedStyling: BoxProps = {};
  if (focused) {
    focusedStyling.boxShadow = "0 0 3px blue";
  }

  const hideChildren = React.useMemo(() => {
    if (
      (element.newQuestions.length < 1 && element.questions.length < 1) ||
      element.quotedStatementId
    )
      return true;
    else return false;
  }, [
    element.newQuestions.length,
    element.questions.length,
    element.quotedStatementId,
  ]);

  return (
    <Box {...attributes}>
      <Box
        id={element.statementId}
        marginX={1}
        marginY={4}
        border="1px solid gray"
        borderRadius={2}
        {...focusedStyling}
      >
        <Box
          flexWrap="wrap"
          display="flex"
          flexDir="column"
          p={1}
          contentEditable={false}
          backgroundColor="gray.100"
        >
          <Box
            display="flex"
            flexDir="row"
            justifyContent="space-between"
            m={1}
            maxW="100%"
            flexWrap="unset"
          >
            <Box display="flex" flexDir="column" flexWrap="wrap">
              {/* QUESTIONS */}
              <Box
                display="flex"
                flexDir="row"
                maxW="100%"
                flexWrap="wrap"
                justifyContent="start"
              >
                {element.questions.map((question, index) => (
                  <Tooltip
                    key={index}
                    label={
                      question.question.length > 30
                        ? question.question
                        : undefined
                    }
                  >
                    <Tag
                      m={1}
                      maxW="25em"
                      cursor="pointer"
                      backgroundColor="gray.300"
                      onClick={() => toggleQuestion(question._id)}
                    >
                      <TagLabel>
                        <Text isTruncated>{question.question}</Text>
                      </TagLabel>
                      <TagCloseButton
                        onClick={() =>
                          CustomEditor.removeQuestion(
                            editor,
                            element.index,
                            index
                          )
                        }
                      />
                    </Tag>
                  </Tooltip>
                ))}
                {element.newQuestions.map((question, index) => (
                  <Tooltip
                    label={
                      question.question.length > 30
                        ? question.question
                        : "New Question"
                    }
                    key={index}
                  >
                    <Tag backgroundColor="gray.300" maxW="25em" m={1}>
                      <TagLeftIcon as={FiStar} />
                      <TagLabel>
                        <Text isTruncated>{question.question}</Text>
                      </TagLabel>
                      <TagCloseButton
                        onClick={() =>
                          CustomEditor.removeNewQuestion(
                            editor,
                            element.index,
                            index
                          )
                        }
                      />
                    </Tag>
                  </Tooltip>
                ))}
                <Box
                  backgroundColor="gray.300"
                  maxW="25em"
                  m={1}
                  p={1}
                  borderRadius="0.375rem"
                >
                  {/* <Icon as={FiPlus} mx={1} /> */}
                  <QuestionSearch
                    questionSelected={questionSelected}
                    handleSubmit={questionSubmitted}
                    placeholder="Add question"
                    size="xs"
                    border="none"
                    maxH="1em"
                    dropdownProps={{ backgroundColor: "gray.300" }}
                    _focus={{ border: "none" }}
                    inputRightElement={null}
                    inputLeftElement={<Icon as={FiPlus} />}
                  />
                </Box>
              </Box>
            </Box>
            <Box display="flex" flexDir="row" height="100%">
              {element.statementId.includes("NEW") && (
                <Text color="gray.600" pr={2} pt={1}>
                  New
                </Text>
              )}
              <ButtonGroup
                isAttached
                variant="outline"
                size="sm"
                backgroundColor="white"
                alignContent="center"
              >
                <Tooltip label="Move statement up">
                  <IconButton
                    aria-label="Add Above"
                    icon={<FiChevronsUp />}
                    onClick={() =>
                      CustomEditor.moveStatement(editor, element.index, "down")
                    }
                  />
                </Tooltip>
                <Tooltip label="Move statement down">
                  <IconButton
                    aria-label="Add Below"
                    icon={<FiChevronsDown />}
                    onClick={() =>
                      CustomEditor.moveStatement(editor, element.index, "up")
                    }
                  />
                </Tooltip>
              </ButtonGroup>
            </Box>
          </Box>
          {form && (
            <Box m={1}>
              {form === Form.Question && (
                <QuestionSearch
                  questionSelected={questionSelected}
                  handleSubmit={questionSubmitted}
                />
              )}
            </Box>
          )}
          {selectedQuestionId && (
            <Box m={1} p={1} borderRadius={4} backgroundColor="gray.100">
              <Heading size="sm" ml={1}>
                Recommended Quotes
              </Heading>
              <Box m={2} borderTop="1px solid darkgray"></Box>
              <RecommendedStatements
                questionId={selectedQuestionId}
                avoidedPage={pageId}
                optionButtons={(statementId) => (
                  <Box display="flex" flexDir="column">
                    <Button
                      m={1}
                      onClick={() => statementSelected(statementId)}
                    >
                      Inline
                    </Button>
                    <Box
                      backgroundColor="gray.700"
                      w="100%"
                      h="1px"
                      my={1}
                    ></Box>
                    <Button
                      m={1}
                      onClick={() => fullQuoteSelected(statementId)}
                    >
                      Full
                    </Button>
                  </Box>
                )}
              />
            </Box>
          )}
        </Box>
        {element.quotedStatementId && (
          <Box contentEditable={false} m={2}>
            <Box
              backgroundColor="gray.200"
              borderRadius={2}
              p={2}
              display="flex"
              flexDir="row"
              justifyContent="space-between"
            >
              <QuotedStatement statementID={element.quotedStatementId} />
              <CloseButton
                onClick={() =>
                  CustomEditor.removeFullQuote(editor, element.index)
                }
              />
            </Box>
          </Box>
        )}
        <Box
          m={2}
          tabIndex={element.index + 1}
          display={hideChildren ? "none" : ""}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default React.memo(StatementElement);
