import { Page, ParagraphDocument } from "@models";

const page = async (paragraph: ParagraphDocument) => {
  return await Page.getById(paragraph.page!.toString());
};

export default {
  page,
};
