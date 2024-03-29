import {
  PageDocument,
  PageModel,
  Paragraph,
  ParagraphDocument,
  StatementDocument,
} from "@models";
import { IPageBuildData } from "@typescript/models/Page";

const build = (Page: PageModel, data: IPageBuildData) => {
  return new Promise<{
    page: PageDocument;
    paragraph: ParagraphDocument;
    statements: StatementDocument[];
  }>(async (resolve, reject) => {
    try {
      const page = new Page({
        title: data.title,
        originalAuthor: data.author._id,
      });

      const { paragraph, statements } = await Paragraph.buildFirst({
        page,
        author: data.author,
        statements: data.paragraph.statements,
      });

      await page.validateDocument();

      resolve({ page, paragraph, statements });
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  build,
};
