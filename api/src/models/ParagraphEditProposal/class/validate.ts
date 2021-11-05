import {
  Paragraph,
  ParagraphEditProposalDocument,
  Statement,
  StatementClass,
  User,
} from "@models";
import statements from "@testing/documents/statements/covid_19_deaths";
import { EditProposalChangeTypes } from "@typescript/models/ParagraphEditProposal";
import validateNewQuestionArray from "@validation/validateNewQuestionArray";
import validateQuestionArray from "@validation/validateQuestionArray";
import validateStringArray from "@validation/validateStringArray";
import { isEmpty } from "class-validator";

const document = (paragraphEditProposal: ParagraphEditProposalDocument) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      // ensure paragraph is valid
      const paragraph = await Paragraph.getById(
        paragraphEditProposal.paragraph!.toString()
      );
      if (!paragraph) throw new Error("must provide a valid paragraph");

      // ensure paragraph is mostRecent
      if (!paragraph.mostRecent)
        throw new Error("can only add edit proposals to current paragraphs");

      // ensure author is valid
      const author = await User.getById(
        paragraphEditProposal.author!.toString()
      );
      if (!author) throw new Error("must provide a valid user Id for author");

      // validate description
      if (isEmpty(paragraphEditProposal.description))
        throw new Error("must provide a description for this proposal");

      // validate each statement items
      if (
        !paragraphEditProposal.statementItems ||
        paragraphEditProposal.statementItems.length < 1
      )
        throw new Error("must provide the new array of statements");

      const originalParagraphStatements = paragraph.statements.map(
        (paragraphStatement) => paragraphStatement.statement!.toString()
      );
      const allChangeTypes = paragraphEditProposal.statementItems.map(
        (item) => item.changeType
      );

      // ensure there are edits
      if (
        // check for order changes
        JSON.stringify(originalParagraphStatements) ===
          JSON.stringify(
            paragraphEditProposal.statementItems.map((item) =>
              item.paragraphStatement?.statement?.toString()
            )
          ) &&
        // check for changes
        !allChangeTypes.includes(EditProposalChangeTypes.ADD) &&
        !allChangeTypes.includes(EditProposalChangeTypes.EDIT) &&
        !allChangeTypes.includes(EditProposalChangeTypes.REMOVE)
      )
        throw new Error("this proposal contains no edits");

      const seenIds: string[] = [];
      for (let i = 0; i < paragraphEditProposal.statementItems.length; i++) {
        const statement = paragraphEditProposal.statementItems[i];

        try {
          // Ensure all statement references are unique
          if (statement.paragraphStatement?.statement) {
            if (
              seenIds.includes(
                statement.paragraphStatement.statement.toString()
              )
            )
              throw new Error("duplicate statement reference");

            if (
              !originalParagraphStatements.includes(
                statement.paragraphStatement.statement.toString()
              )
            )
              throw new Error("statement does not belong to this paragraph");

            seenIds.push(statement.paragraphStatement.statement.toString());
          }

          // validation if updating an existing statement
          if (
            statement.changeType === "EDIT" ||
            statement.changeType === "REMOVE" ||
            statement.changeType === "NONE"
          ) {
            // Ensure statement Id is provided and valid if necessary
            if (
              !statement.paragraphStatement ||
              !statement.paragraphStatement.statement
            )
              throw new Error(`must provide a statement Id`);

            const fetchedStatement = await Statement.getById(
              statement.paragraphStatement.statement.toString()
            );
            if (!fetchedStatement)
              throw new Error(`must provide a valid statement Id`);

            if (
              !fetchedStatement.versions[
                statement.paragraphStatement.versionIndex
              ]
            )
              throw new Error(`must provide a valid version index`);
          }

          // Validate stringArray and questions if necessary
          if (
            statement.changeType === EditProposalChangeTypes.ADD ||
            statement.changeType === EditProposalChangeTypes.EDIT
          ) {
            if (
              (!statement.stringArray || statement.stringArray.length < 1) &&
              !statement.quotedStatement
            )
              throw new Error(
                `must provide a string array or quoted statement if editting or adding`
              );

            if (statement.stringArray && statement.stringArray.length > 0)
              try {
                await validateStringArray(statement.stringArray);
              } catch (e: any) {
                throw new Error(`${e.message}`);
              }

            // validate existence of questions
            if (
              (!statement.questions || statement.questions.length < 1) &&
              (!statement.newQuestions || statement.newQuestions.length < 1)
            )
              throw new Error("must provide at least one question");

            try {
              // Validate questions
              await validateQuestionArray(statement.questions);

              // Validate newQuestions
              await validateNewQuestionArray(statement.newQuestions);
            } catch (e: any) {
              throw new Error(`${e.message}`);
            }
          }
        } catch (e: any) {
          throw new Error(`statements[${i}] - ${e.message}`);
        }
      }

      // ensure all existing statements exist in proposal
      for (let i = 0; i < originalParagraphStatements.length; i++) {
        if (!seenIds.includes(originalParagraphStatements[i]))
          throw new Error(
            "must provide a statement item for each existing statement in the paragraph"
          );
      }

      await paragraphEditProposal.validate();

      resolve();
    } catch (e: any) {
      reject(new Error(`paragraphEditProposal.validate: ${e.message}`));
    }
  });
};

export default {
  document,
};
