import { Types } from "mongoose";
import {
  StatementDocument,
  StatementModel,
  File,
  QuestionDocument,
  Question,
  ParagraphEditProposalStatementClass,
  ParagraphEditProposalDocument,
  QuestionClass,
} from "@models";
import { EditProposalChangeTypes } from "@typescript/models/ParagraphEditProposal";
import { IStatementBuildData, StyleTypes } from "@typescript/models/Statement";
import { Ref } from "@typegoose/typegoose";
import buildStringArray from "@utils/buildStringArray";

const build = (Statement: StatementModel, data: IStatementBuildData) => {
  return new Promise<StatementDocument>(async (resolve, reject) => {
    try {
      const newQuestions: QuestionDocument[] = [];

      for (let i = 0; i < data.version.newQuestions.length; i++) {
        const newQuestion = await Question.build({
          question: data.version.newQuestions[i],
        });

        await newQuestion.save();

        newQuestions.push(newQuestion);
      }

      const versionStringArray = await buildStringArray(
        data.version.stringArray
      );

      const statement = new Statement({
        page: data.page,
        originalAuthor: data.author,
        versions: [
          {
            ...data.version,
            questions: [
              ...data.version.questions,
              ...newQuestions.map((question) => question._id),
            ],
            stringArray: versionStringArray,
          },
        ],
      });

      await statement.validateDocument();

      resolve(statement);
    } catch (e) {
      reject(e);
    }
  });
};

const fromEditProposalStatement = (
  Statement: StatementModel,
  statementItem: ParagraphEditProposalStatementClass,
  editProposal: ParagraphEditProposalDocument
) => {
  return new Promise<StatementDocument>(async (resolve, reject) => {
    try {
      let statement: StatementDocument | undefined;

      // Get statement if already exists
      if (
        statementItem.changeType === EditProposalChangeTypes.NONE ||
        statementItem.changeType === EditProposalChangeTypes.EDIT ||
        statementItem.changeType === EditProposalChangeTypes.REMOVE
      ) {
        if (!statementItem.paragraphStatement)
          throw new Error("invalid statement item - no paragraph statement");
        statement = (await Statement.getById(
          statementItem.paragraphStatement.statement!.toString(),
          { throwError: true }
        ))!;
      }

      // Add new questions
      const newQuestions: QuestionDocument[] = [];
      if (
        statementItem.changeType === EditProposalChangeTypes.ADD ||
        statementItem.changeType === EditProposalChangeTypes.EDIT
      ) {
        for (let i = 0; i < statementItem.newQuestions.length; i++) {
          const newQuestion = await Question.build({
            question: statementItem.newQuestions[i],
          });

          await newQuestion.save();

          newQuestions.push(newQuestion);
        }
      }

      const questions: Ref<QuestionClass, Types.ObjectId | undefined>[] = [
        ...statementItem.questions,
        ...newQuestions.map((question) => question._id),
      ];

      switch (statementItem.changeType) {
        case EditProposalChangeTypes.REMOVE: {
          statement!.current = false;

          break;
        }
        case EditProposalChangeTypes.EDIT: {
          statement!.versions.push({
            questions,
            stringArray: statementItem.stringArray,
            quotedStatement: statementItem.quotedStatement,
            createdAt: new Date(),
            sourceEditProposal: editProposal._id,
          });

          break;
        }
        case EditProposalChangeTypes.ADD: {
          const paragraph = await editProposal.getParagraph();

          statement = new Statement({
            page: paragraph.page,
            current: true,
            originalAuthor: editProposal.author,
            versions: [
              {
                questions,
                stringArray: statementItem.stringArray,
                quotedStatement: statementItem.quotedStatement,
                sourceEditProposal: editProposal._id,
              },
            ],
          });
        }
      }

      resolve(statement!);
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  build,
  fromEditProposalStatement,
};
