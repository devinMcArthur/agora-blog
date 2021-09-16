import React, { FC } from "react";
import { useParagraphForm } from "../../../contexts/ParagraphForm";
import { DisplayStatementSnippetFragment } from "../../../generated/graphql";
import StatementService from "../../../services/statementService";

interface IStatementForm {
  statement: DisplayStatementSnippetFragment;
}

const StatementForm: FC<IStatementForm> = ({ statement }) => {
  const { handleStatementChange } = useParagraphForm();

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const element = document.getElementById(statement._id);
    console.log("element", element);

    if (element) handleStatementChange(statement._id, element);
  };

  return (
    <div
      contentEditable
      suppressContentEditableWarning
      onKeyUp={handleKeyUp}
      id={statement._id}
      onDrop={(e) => e.preventDefault()}
    >
      {StatementService().translateStatementToJSX(statement)}
    </div>
  );
};

export default StatementForm;
