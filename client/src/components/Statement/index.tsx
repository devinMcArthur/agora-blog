import React from "react";
import { DisplayStatementSnippetFragment } from "../../generated/graphql";
import createLink from "../../utils/createLink";

import StringArray from "../Common/StringArray";
import TextLink from "../Common/TextLink";
import QuotedStatement from "./views/QuotedStatement";

interface IStatement {
  statement: DisplayStatementSnippetFragment;
  versionIndex?: number;
}

const Statement = ({ statement, versionIndex }: IStatement) => {
  const statementVersion = React.useMemo(() => {
    if (versionIndex !== undefined && statement.versions[versionIndex])
      return versionIndex;
    else return statement.versions.length - 1;
  }, [versionIndex, statement]);

  const currentVersion = React.useMemo(
    () => statement.versions[statementVersion],
    [statement, statementVersion]
  );

  let questions;
  if (currentVersion.questions && currentVersion.questions.length > 0) {
    questions = currentVersion.questions.map((question, index) => {
      if (question)
        return (
          <sup key={index}>
            [
            <TextLink
              link={createLink.questionLink(question.slug)}
              title={question.question}
            >
              q{index + 1}
            </TextLink>
            ]
          </sup>
        );
      else return null;
    });
  }

  const content = React.useMemo(() => {
    if (currentVersion.quotedStatement) {
      return (
        <QuotedStatement statementID={currentVersion.quotedStatement._id} />
      );
    } else {
      return <StringArray stringArray={currentVersion.stringArray} />;
    }
  }, [currentVersion]);

  return (
    <span>
      {content}
      {questions}
    </span>
  );
};

export default Statement;
