import Page from "../../../models/Page";
import { ParagraphDocument } from "../../../models/Paragraph";

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
