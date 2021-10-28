import { Page, ParagraphDocument } from "@models";

const page = async (paragraph: ParagraphDocument) => {
  return await Page.getByID(paragraph.page!.toString());
};

export default {
  page,
};
