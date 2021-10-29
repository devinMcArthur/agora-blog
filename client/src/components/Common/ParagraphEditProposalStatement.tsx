import { Box } from "@chakra-ui/layout";
import React from "react";
import { ParagraphEditProposalStatementSnippetFragment } from "../../generated/graphql";
import StringArray from "./StringArray";

interface IParagraphEditProposalStatement {
  statement: ParagraphEditProposalStatementSnippetFragment;
  versionIndex: number | "EDIT";
}

const ParagraphEditProposalStatement = ({
  statement,
  versionIndex,
}: IParagraphEditProposalStatement) => {
  const stringArray = React.useMemo(() => {
    if (
      statement.stringArray &&
      statement.stringArray.length > 0 &&
      versionIndex === "EDIT"
    ) {
      return statement.stringArray;
    } else if (statement.paragraphStatement) {
      return statement.paragraphStatement.statement.versions[
        versionIndex !== "EDIT" &&
        statement.paragraphStatement.statement.versions[versionIndex]
          ? versionIndex
          : statement.paragraphStatement.versionIndex
      ].stringArray;
    } else return [];
  }, [statement.paragraphStatement, statement.stringArray, versionIndex]);

  return (
    <Box>
      <StringArray stringArray={stringArray} />
    </Box>
  );
};

export default ParagraphEditProposalStatement;
