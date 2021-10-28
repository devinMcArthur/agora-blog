import {
  Paragraph,
  ParagraphEditProposalDocument,
  Statement,
  StatementClass,
  User,
} from "@models";
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
        !paragraphEditProposal.statements ||
        paragraphEditProposal.statements.length < 1
      )
        throw new Error("must provide the new array of statements");

      const seenIds: StatementClass[] = [];
      for (let i = 0; i < paragraphEditProposal.statements.length; i++) {
        const statement = paragraphEditProposal.statements[i];

        try {
          // Ensure all statement references are unique
          if (statement.statement && seenIds.includes(statement.statement))
            throw new Error("duplicate statement reference");

          // validation if updating an existing statement
          if (
            statement.changeType === "EDIT" ||
            statement.changeType === "REMOVE" ||
            statement.changeType === "NONE"
          ) {
            // Ensure statement Id is provided and valid if necessary
            if (!statement.statement)
              throw new Error(`must provide a statement Id`);

            const fetchedStatement = await Statement.getById(
              statement.statement.toString()
            );
            if (!fetchedStatement)
              throw new Error(`must provide a valid statement Id`);
          }

          // Validate stringArray if necessary
          if (
            statement.changeType === EditProposalChangeTypes.ADD ||
            statement.changeType === EditProposalChangeTypes.EDIT
          ) {
            if (!statement.stringArray || statement.stringArray.length < 1)
              throw new Error(
                `must provide a string array if editting or adding`
              );

            try {
              await validateStringArray(statement.stringArray);
            } catch (e: any) {
              throw new Error(`${e.message}`);
            }
          }

          try {
            // Validate questions

            await validateQuestionArray(statement.questions);

            // Validate newQuestions
            await validateNewQuestionArray(statement.newQuestions);
          } catch (e: any) {
            throw new Error(`${e.message}`);
          }
        } catch (e: any) {
          reject(new Error(`statements[${i}] - ${e.message}`));
        }
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
