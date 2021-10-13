import React from "react";
import { RenderElementProps } from "slate-react";

import { Box, Divider, HStack } from "@chakra-ui/layout";
import { ButtonGroup, IconButton } from "@chakra-ui/button";
import { Tooltip } from "@chakra-ui/tooltip";
import {
  FiChevronDown,
  FiChevronUp,
  FiPlus,
  FiStar,
  FiTrash,
} from "react-icons/fi";
import { CustomEditor } from "../utils";
import { Editor } from "slate";
import { StatementElementType } from "../../../../models/slate";
import { Tag, TagLabel, TagCloseButton, TagLeftIcon } from "@chakra-ui/react";
import QuestionSearch from "../../QuestionSearch";

enum Form {
  Question = "Question",
}

interface IStatementElement extends RenderElementProps {
  element: StatementElementType;
  editor: Editor;
}

const StatementElement = ({
  attributes,
  children,
  element,
  editor,
}: IStatementElement) => {
  const [form, setForm] = React.useState<Form>();

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

  const questionSelected = (question: { _id: string; question: string }) => {
    toggleQuestionForm();

    CustomEditor.addQuestion(editor, element.index, question);
  };

  const questionSubmitted = (question: string) => {
    toggleQuestionForm();

    CustomEditor.addNewQuestion(editor, element.index, question);
  };

  /**
   * ----- Variables -----
   */

  const disabled = React.useMemo(() => {
    return element.index !== editor.selection?.anchor.path[0];
  }, [editor.selection?.anchor.path, element.index]);

  return (
    <Box
      id={element.statementId}
      marginX={1}
      marginY={4}
      padding={1}
      border="1px solid gray"
      borderRadius={2}
      {...attributes}
    >
      <Box display="flex" flexDir="column" contentEditable={false} p={1}>
        <Box display="flex" flexDir="row" justifyContent="space-between" m={1}>
          <Box>
            <ButtonGroup isAttached variant="outline" size="sm">
              <Tooltip label="Add new statement above">
                <IconButton
                  disabled={disabled}
                  aria-label="Add Above"
                  icon={<FiChevronUp />}
                  onClick={
                    () => {}
                    // CustomEditor.addStatement(editor, "before", index)
                  }
                />
              </Tooltip>
              <Tooltip label="Add new statement below">
                <IconButton
                  disabled={disabled}
                  aria-label="Add Below"
                  icon={<FiChevronDown />}
                  onClick={
                    () => {}
                    // CustomEditor.addStatement(editor, "after", index)
                  }
                />
              </Tooltip>
            </ButtonGroup>
          </Box>
          <IconButton
            aria-label="Delete Statement"
            variant="link"
            size="sm"
            icon={<FiTrash />}
            disabled={disabled}
            onClick={() => CustomEditor.removeStatement(editor, element.index)}
          />
        </Box>
        <HStack m={1}>
          {element.questions.map((question, index) => (
            <Tag key={index}>
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
                    CustomEditor.removeNewQuestion(editor, element.index, index)
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
      </Box>
      <Divider />
      {children}
    </Box>
  );
};

export default StatementElement;
