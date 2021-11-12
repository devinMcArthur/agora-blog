import {
  Page,
  PageDocument,
  ParagraphDocument,
  ParagraphEditProposalDocument,
  ParagraphModel,
  ParagraphStatementClass,
  Statement,
  StatementDocument,
} from "@models";
import { IParagraphBuildData } from "@typescript/models/Paragraph";
import { EditProposalChangeTypes } from "@typescript/models/ParagraphEditProposal";

const first = (Paragraph: ParagraphModel, data: IParagraphBuildData) => {
  return new Promise<{
    paragraph: ParagraphDocument;
    statements: StatementDocument[];
  }>(async (resolve, reject) => {
    try {
      if (!data.page) throw new Error("must provide a page for this paragraph");
      if (data.page.paragraphs.length > 0)
        throw new Error(
          "must use an edit proposal to add an additional paragraph to a page"
        );

      if (!data.statements || data.statements.length < 1)
        throw new Error("paragraph must have at least one statement");

      const statements: StatementDocument[] = [];

      const paragraph = new Paragraph({
        ...data,
        page: data.page._id,
        mostRecent: true,
        statements: await Promise.all(
          data.statements.map(async (statement) => {
            const newStatement = await Statement.build({
              author: data.author._id,
              page: data.page._id,
              version: statement,
            });

            statements.push(newStatement);

            return {
              versionIndex: 0,
              statement: newStatement._id,
            };
          })
        ),
      });

      data.page.paragraphs.push(paragraph._id);

      await paragraph.validateDocument();

      resolve({
        paragraph: paragraph,
        statements: statements,
      });
    } catch (e) {
      reject(e);
    }
  });
};

export interface IParagraphBuildFromProposalResponse {
  oldParagraph: ParagraphDocument;
  newParagraph: ParagraphDocument;
  statements: StatementDocument[];
  page: PageDocument;
}

const fromProposal = (
  Paragraph: ParagraphModel,
  editProposal: ParagraphEditProposalDocument
) => {
  return new Promise<IParagraphBuildFromProposalResponse>(
    async (resolve, reject) => {
      try {
        const oldParagraph = await editProposal.getParagraph();

        if (oldParagraph.mostRecent === false)
          throw new Error("this edit proposal is outdated");

        oldParagraph.mostRecent = false;

        const page = await oldParagraph.getPage();

        const paragraphStatements: ParagraphStatementClass[] = [];
        const allStatements: StatementDocument[] = [];
        for (let i = 0; i < editProposal.statementItems.length; i++) {
          const statement = await Statement.buildFromEditProposalStatement(
            editProposal.statementItems[i],
            editProposal
          );

          if (
            editProposal.statementItems[i].changeType !==
            EditProposalChangeTypes.REMOVE
          ) {
            paragraphStatements.push({
              statement: statement._id,
              versionIndex: statement.versions.length - 1,
            });
          }

          allStatements.push(statement);
        }

        const newParagraph = new Paragraph({
          sourceEditProposal: editProposal._id,
          page: oldParagraph.page,
          mostRecent: true,
          statements: paragraphStatements,
        });

        page.paragraphs.push(newParagraph._id);

        resolve({
          oldParagraph,
          newParagraph,
          statements: allStatements,
          page,
        });
      } catch (e) {
        reject(e);
      }
    }
  );
};

export default {
  first,
  fromProposal,
};
