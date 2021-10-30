import { Box } from "@chakra-ui/layout";
import React from "react";
import { ParagraphEditProposalStatementSnippetFragment } from "../../generated/graphql";
import Statement from "../Statement";
import QuotedStatement from "../Statement/views/QuotedStatement";
import ErrorMessage from "./ErrorMessage";
import StringArray from "./StringArray";

interface IParagraphEditProposalStatement {
  statement: ParagraphEditProposalStatementSnippetFragment;
  versionIndex: number | "EDIT";
}

const ParagraphEditProposalStatement = ({
  statement,
  versionIndex,
}: IParagraphEditProposalStatement) => {
  const content = React.useMemo(() => {
    if (
      statement.stringArray &&
      statement.stringArray.length > 0 &&
      versionIndex === "EDIT"
    ) {
      return <StringArray stringArray={statement.stringArray} />;
    } else if (statement.paragraphStatement) {
      return (
        <Statement
          statement={statement.paragraphStatement.statement}
          versionIndex={statement.paragraphStatement.versionIndex}
        />
      );
    } else if (statement.quotedStatement) {
      return <QuotedStatement statementID={statement.quotedStatement._id} />;
    } else return <ErrorMessage />;
  }, [
    statement.paragraphStatement,
    statement.quotedStatement,
    statement.stringArray,
    versionIndex,
  ]);

  return <Box>{content}</Box>;
};

export default ParagraphEditProposalStatement;
