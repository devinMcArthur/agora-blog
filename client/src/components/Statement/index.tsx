import { Box, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { DisplayStatementSnippetFragment } from "../../generated/graphql";

import StatementService from "../../services/statementService";
import TextLink from "../Common/TextLink";

const Statement = (props: {
  statement: DisplayStatementSnippetFragment;
  showSources?: boolean;
  showQuestions?: boolean;
}) => {
  const { statement } = props;
  const currentVersion = statement.versions[statement.versions.length - 1];

  const [showAllQuestions, setShowAllQuestions] = useState<Boolean>(false);

  // Default show sources to true
  let { showSources } = props;
  if (showSources !== false) showSources = true;

  /**
   * Question(s)
   */
  let questionJSX;
  const questions = [];
  if (props.showQuestions === true) {
    // Create array with all questions
    for (let i in currentVersion.questions) {
      questions.push(
        <Text
          as="i"
          fontSize="sm"
          borderBottom="1px solid lightgrey"
          ml={3}
          onClick={() =>
            (window.location.href = `/q/${currentVersion.questions[i]._id}`)
          }
          _hover={{ cursor: "pointer" }}
        >
          {currentVersion.questions[i].question}
        </Text>
      );
    }

    // Show questions button
    let showQuestionsButton;
    if (questions.length > 1 && showAllQuestions === false) {
      showQuestionsButton = (
        <Box
          as="span"
          onClick={() => setShowAllQuestions(true)}
          _hover={{ cursor: "pointer" }}
          ml={3}
        >
          [...]
        </Box>
      );
    }

    questionJSX = (
      <Box display="block">
        {showAllQuestions ? questions : questions[0]}
        {showQuestionsButton}
      </Box>
    );
  }

  /**
   * Sources, post-fixes
   */
  let sourcePages, sourceURLs, questionsPost;
  if (currentVersion.sources && showSources) {
    let index = 0;
    if (currentVersion.sources.pages) {
      sourcePages = currentVersion.sources.pages.map((page) => {
        index++;
        return (
          <sup>
            [
            <TextLink link={`/p/${page.slug}`} title={page.title}>
              p-{index}
            </TextLink>
            ]
          </sup>
        );
      });
    }
    if (currentVersion.sources.urls) {
      sourceURLs = currentVersion.sources.urls.map((url) => {
        index++;
        return (
          <sup>
            [
            <TextLink link={url} isExternal title={url}>
              {index}
            </TextLink>
            ]
          </sup>
        );
      });
    }
  }
  if (
    currentVersion.questions &&
    currentVersion.questions.length > 0 &&
    showSources
  ) {
    questionsPost = currentVersion.questions.map((question, index) => {
      if (question)
        return (
          <sup key={index}>
            [
            <TextLink link={`/q/${question._id}`} title={question.question}>
              q{index + 1}
            </TextLink>
            ]
          </sup>
        );
      else return null;
    });
  }

  return (
    <>
      {questionJSX}

      <span>
        {StatementService().translateStatementToJSX(props.statement)}
        {sourcePages}
        {sourceURLs}
        {questionsPost}
      </span>
    </>
  );
};

export default Statement;
