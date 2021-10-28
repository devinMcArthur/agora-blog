import { Box } from "@chakra-ui/layout";
import React from "react";
import { ParagraphEditProposalStatementSnippetFragment } from "../../generated/graphql";
import StringArray from "./StringArray";

interface IParagraphEditProposalStatement {
  statement: ParagraphEditProposalStatementSnippetFragment;
}

const ParagraphEditProposalStatement = ({
  statement,
}: IParagraphEditProposalStatement) => {
  const stringArray = React.useMemo(() => {
    if (statement.stringArray && statement.stringArray.length > 0) {
      return statement.stringArray;
    } else if (statement.statement) {
      return statement.statement.versions[0].stringArray;
    } else return [];
  }, [statement]);

  return (
    <Box>
      <StringArray stringArray={stringArray} />
    </Box>
  );
};

export default ParagraphEditProposalStatement;
