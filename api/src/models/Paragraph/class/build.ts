import {
  ParagraphDocument,
  ParagraphModel,
  Statement,
  StatementDocument,
} from "@models";
import { IParagraphBuildData } from "@typescript/models/Paragraph";

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

// const fromEditProposal = () => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       resolve()
//     } catch (e) {
//       reject(e);
//     }
//   })
// }

export default {
  first,
};
