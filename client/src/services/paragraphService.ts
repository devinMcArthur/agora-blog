import { Types } from "mongoose";
import { DisplayParagraphSnippetFragment } from "../generated/graphql";

export default function ParagraphService() {
  // Returns statement in paragraph that references a given page
  const findSentenceWithPageReference = (
    paragraph: DisplayParagraphSnippetFragment,
    pageID: Types.ObjectId | string
  ) => {
    return paragraph.statements.find((statement) =>
      statement.versions[
        statement.versions.length - 1
      ].stringArray.find((stringArray) =>
        stringArray.styles.find(
          (style) =>
            style.type === "mention" &&
            style.variant === "internal" &&
            style.value.page!._id.toString() === pageID.toString()
        )
      )
    );
  };

  const findStatementByID = (
    paragraph: DisplayParagraphSnippetFragment,
    statementID: Types.ObjectId | string
  ) => {
    return paragraph.statements.find((statement) =>
      statement._id.toString() === statementID.toString()
    );
  };

  const findSentenceWithVariableReference = (
    paragraph: DisplayParagraphSnippetFragment,
    variableID: Types.ObjectId | string
  ) => {
    return paragraph.statements.find((statement) =>
      statement.versions[
        statement.versions.length - 1
      ].stringArray.find((stringArray) =>
        stringArray.styles.find(
          (style) =>
            style.type === "variable" &&
            style.value.variable!._id.toString() === variableID.toString()
        )
      )
    );
  };

  return {
    findSentenceWithPageReference,
    findStatementByID,
    findSentenceWithVariableReference,
  };
}
