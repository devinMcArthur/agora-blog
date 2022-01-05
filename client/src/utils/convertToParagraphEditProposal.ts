import { IParagraphFormState } from "../contexts/ParagraphForm";
import { convertSlateParagraphToStatementData } from "../contexts/ParagraphForm/utils";
import {
  ParagraphEditProposalData,
  ParagraphEditProposalStatementData,
  ParagraphStatementData,
  StringArrayData,
} from "../generated/graphql";
import { EditProposalChangeTypes } from "../models/paragraphEditProposal";
import { StatementElementType } from "../models/slate";
import compareStringArrays from "./compareStringArrays";

const convertToParagraphEditProposal = (
  state: IParagraphFormState
): ParagraphEditProposalData["statementItems"] => {
  const statements: ParagraphEditProposalData["statementItems"] = [];

  if (state.originalParagraph && state.paragraph && state.slateParagraph) {
    const buildStatements = convertSlateParagraphToStatementData(
      state.slateParagraph
    );

    for (let i = 0; i < state.slateParagraph.length; i++) {
      // current slate statement
      const slateStatement = state.slateParagraph[i] as StatementElementType;
      const paragraphStatement = state.paragraph.statements[i];
      const paragraphStatementVersion =
        state.paragraph.statements[i].statement.versions[
          state.paragraph.statements[i].versionIndex
        ];

      let originalStatementVersion;
      const originalStatement = state.originalParagraph.statements.find(
        (statement) => statement.statement._id === slateStatement.statementId
      );
      if (originalStatement) {
        originalStatementVersion =
          originalStatement.statement.versions[originalStatement.versionIndex];
      }

      let changeType: EditProposalChangeTypes = EditProposalChangeTypes.NONE;
      let stringArray: StringArrayData[] | undefined =
        buildStatements[i].stringArray;
      let statement: ParagraphStatementData | undefined = {
        statement: paragraphStatement.statement._id,
        versionIndex: paragraphStatement.versionIndex,
      };
      if (originalStatement)
        statement = {
          statement: originalStatement.statement._id,
          versionIndex: originalStatement.versionIndex,
        };
      let newQuestions: string[] | undefined = slateStatement.newQuestions.map(
        (newQuestion) => newQuestion.question
      );
      let questions: string[] | undefined = slateStatement.questions.map(
        (question) => question._id
      );
      let quotedStatement:
        | ParagraphEditProposalStatementData["quotedStatement"]
        | undefined = paragraphStatementVersion.quotedStatement?._id;

      const currentStringArray = paragraphStatementVersion.stringArray;

      // Handle NEW statments
      if (slateStatement.statementId.includes("NEW")) {
        changeType = EditProposalChangeTypes.ADD;

        questions = slateStatement.questions.map((question) => question._id);
        newQuestions = slateStatement.newQuestions.map(
          (newQuestion) => newQuestion.question
        );
        statement = undefined;

        statements.push({
          changeType,
          stringArray,
          paragraphStatement: statement,
          newQuestions,
          questions,
          quotedStatement,
        });

        continue;
      }

      // Determine whether change type is NONE or EDIT

      if (newQuestions.length > 0) changeType = EditProposalChangeTypes.EDIT;
      else if (
        JSON.stringify(questions) !==
        JSON.stringify(
          originalStatementVersion?.questions.map((question) => question._id)
        )
      )
        changeType = EditProposalChangeTypes.EDIT;
      else if (
        quotedStatement !== originalStatementVersion?.quotedStatement?._id
      )
        changeType = EditProposalChangeTypes.EDIT;
      else if (currentStringArray && currentStringArray.length > 0) {
        // see if stringArray has changed

        // string array is new (used to be a quoted statement)
        if (!originalStatementVersion?.stringArray)
          changeType = EditProposalChangeTypes.EDIT;
        // string array has changed
        else if (
          !compareStringArrays(
            originalStatementVersion?.stringArray,
            currentStringArray
          )
        )
          changeType = EditProposalChangeTypes.EDIT;
      }

      if (changeType === EditProposalChangeTypes.EDIT) {
        statements.push({
          changeType,
          stringArray,
          paragraphStatement: statement,
          newQuestions,
          questions,
          quotedStatement,
        });
      } else if (changeType === EditProposalChangeTypes.NONE) {
        statements.push({
          changeType,
          paragraphStatement: statement,
        });
      }
    }

    // Find all removed statements
    const originalStatements = state.originalParagraph.statements.map(
      (statement) => statement.statement._id
    );
    const currentStatements = state.paragraph.statements.map(
      (statement) => statement.statement._id
    );

    // Add all statements that were removed
    originalStatements.forEach((id, index) => {
      if (!currentStatements.includes(id))
        statements.push({
          changeType: EditProposalChangeTypes.REMOVE,
          paragraphStatement: {
            statement: id,
            versionIndex: state.paragraph!.statements[index].versionIndex,
          },
        });
    });
  }

  return statements;
};

export default convertToParagraphEditProposal;
