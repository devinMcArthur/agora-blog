import React from "react";
import styled from "styled-components";

import SentenceService from "../../services/sentenceService";

import { SentencePopulated } from "../../typescript/interfaces/documents/Sentence";

const LinkTag = styled.a`
  text-decoration-line: none;

  &:visited {
    color: blue;
  }
`;

const Sentence = (props: {
  sentence: SentencePopulated;
  showSources?: boolean;
}) => {
  const { sentence } = props;

  // Default show sources to true
  let { showSources } = props;
  if (showSources !== false) showSources = true;
  console.log(showSources);

  let sourcePages, sourceURLs, questions;
  if (sentence.sources && showSources) {
    let index = 1;
    if (sentence.sources.pages) {
      sourcePages = sentence.sources.pages.map((page) => {
        index++;
        return (
          <sup>
            [<LinkTag href={`/p/${page.page.slug}`}>p-{index}</LinkTag>]
          </sup>
        );
      });
    }
    if (sentence.sources.urls) {
      sourceURLs = sentence.sources.urls.map((url) => {
        index++;
        return (
          <sup>
            [
            <LinkTag href={url.url} target="_blank" rel="noreferrer">
              {index}
            </LinkTag>
            ]
          </sup>
        );
      });
    }
  }
  if (sentence.questions && sentence.questions.length > 0 && showSources) {
    questions = sentence.questions.map((question, index) => {
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
      {SentenceService().translateSentenceToJSX(props.sentence)}
      {sourcePages}
      {sourceURLs}
      {questions}
    </span>
  );
};

export default Sentence;
