import React from "react";
import { DisplayStatementSnippetFragment } from "../../generated/graphql";

import StringArray from "../Common/StringArray";
import TextLink from "../Common/TextLink";

interface IStatement {
  statement: DisplayStatementSnippetFragment;
  versionIndex?: number;
}

const Statement = ({ statement, versionIndex }: IStatement) => {
  const statementVersion = React.useMemo(() => {
    if (versionIndex !== undefined) return versionIndex;
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
      <StringArray
        stringArray={statement.versions[statementVersion].stringArray}
      />
      {questions}
    </span>
  );
};

export default Statement;
