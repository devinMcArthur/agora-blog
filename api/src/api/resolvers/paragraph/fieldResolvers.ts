import { Page, ParagraphDocument } from "@models";

const page = async (paragraph: ParagraphDocument) => {
  return await Page.getByID(paragraph.page!.toString(), { fromCache: true });
};

const statements = async (paragraph: ParagraphDocument) => {
  return await paragraph.getStatements({ fromCache: true });
};

export default {
  page,
  statements,
};
