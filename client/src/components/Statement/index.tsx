import React from "react";
import styled from "styled-components";
import { DisplayStatementSnippetFragment } from "../../generated/graphql";

import StatementService from "../../services/statementService";

const LinkTag = styled.a`
  text-decoration-line: none;

  &:visited {
    color: blue;
  }
`;

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
            [<LinkTag href={`/p/${page.slug}`}>p-{index}</LinkTag>]
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
            <LinkTag href={url} target="_blank" rel="noreferrer">
              {index}
            </LinkTag>
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
          <sup key={index} title={question.question}>
            [<LinkTag href={`/q/${question._id}`}>q{index + 1}</LinkTag>]
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
