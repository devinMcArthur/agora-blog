import React from "react";
import { RenderElementProps } from "slate-react";

import { Box, BoxProps, Divider, Heading, HStack } from "@chakra-ui/layout";
import { ButtonGroup, IconButton } from "@chakra-ui/button";
import { Tooltip } from "@chakra-ui/tooltip";
import { FiChevronsDown, FiChevronsUp, FiPlus, FiStar } from "react-icons/fi";
import { CustomEditor } from "../utils";
import { Editor } from "slate";
import { StatementElementType } from "../../../../models/slate";
import { Tag, TagLabel, TagCloseButton, TagLeftIcon } from "@chakra-ui/react";
import QuestionSearch from "../../QuestionSearch";
import RecommendedStatements from "../../RecommendedStatements";

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

    CustomEditor.setQuote(editor, statementId, element.index);
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
    return element.index === editor.selection?.anchor.path[0];
  }, [editor.selection?.anchor.path, element.index]);

  /**
   * ----- Render -----
   */

  const focusedStyling: BoxProps = {};
  if (focused) {
    focusedStyling.boxShadow = "0 0 3px blue";
  }

  return (
    <Box
      id={element.statementId}
      marginX={1}
      marginY={4}
      padding={1}
      border="1px solid gray"
      borderRadius={2}
      {...focusedStyling}
      {...attributes}
    >
      <Box display="flex" flexDir="column" contentEditable={false} p={1}>
        <Box display="flex" flexDir="row" justifyContent="space-between" m={1}>
          {/* QUESTIONS */}
          <HStack m={1}>
            {element.questions.map((question, index) => (
              <Tag
                key={index}
                cursor="pointer"
                onClick={() => toggleQuestion(question._id)}
              >
                <TagLabel>{question.question}</TagLabel>
                <TagCloseButton
                  onClick={() =>
                    CustomEditor.removeQuestion(editor, element.index, index)
                  }
                />
              </Tag>
            ))}
            {element.newQuestions.map((question, index) => (
              <Tooltip label="New question">
                <Tag key={index}>
                  <TagLeftIcon as={FiStar} />
                  <TagLabel>{question.question}</TagLabel>
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
            <Tag cursor="pointer" onClick={toggleQuestionForm}>
              <TagLeftIcon as={FiPlus} />
              <TagLabel>Add Question</TagLabel>
            </Tag>
          </HStack>
          <Box>
            <ButtonGroup isAttached variant="outline" size="sm">
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
              selectedStatement={(statementId) =>
                statementSelected(statementId)
              }
              avoidedPage={pageId}
            />
          </Box>
        )}
      </Box>
      <Divider />
      <Box m={2}>{children}</Box>
    </Box>
  );
};

export default StatementElement;
