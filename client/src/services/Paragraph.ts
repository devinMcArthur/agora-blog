import { DisplayParagraphSnippetFragment } from "../generated/graphql";

export default function ParagraphService() {
  // Returns statement in paragraph that references a given page
  const findSentenceWithPageReference = (
    paragraph: DisplayParagraphSnippetFragment,
    pageID: string
  ) => {
    return paragraph.statements.find((statement) =>
      statement.statement.versions[
        statement.statement.versions.length - 1
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

  const findSentenceWithQuestionReference = (
    paragraph: DisplayParagraphSnippetFragment,
    questionID: string
  ) => {
    return paragraph.statements.find((statement) =>
      statement.statement.versions[
        statement.statement.versions.length - 1
      ].questions.find(
        (connection) => connection._id.toString() === questionID.toString()
      )
    );
  };

  const findSentenceWithVariableReference = (
    paragraph: DisplayParagraphSnippetFragment,
    variableID: string
  ) => {
    return paragraph.statements.find((statement) =>
      statement.statement.versions[
        statement.statement.versions.length - 1
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
    findSentenceWithQuestionReference,
    findSentenceWithVariableReference,
  };
}
