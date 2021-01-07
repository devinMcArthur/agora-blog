import React from "react";
import { DisplayStatementSnippetFragment } from "../../generated/graphql";

import StatementService from "../../services/statementService";
import TextLink from "../Common/TextLink";

const Statement = (props: {
  statement: DisplayStatementSnippetFragment;
  showSources?: boolean;
}) => {
  const { statement } = props;

  const currentVersion = statement.versions[statement.versions.length - 1];

  // Default show sources to true
  let { showSources } = props;
  if (showSources !== false) showSources = true;

  let sourcePages, sourceURLs, questions;
  if (currentVersion.sources && showSources) {
    let index = 1;
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
    questions = currentVersion.questions.map((question, index) => {
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
    <span>
      {StatementService().translateStatementToJSX(props.statement)}
      {sourcePages}
      {sourceURLs}
      {questions}
    </span>
  );
};

export default Statement;
