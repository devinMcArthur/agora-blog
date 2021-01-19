import { PageDocument } from "../../../models/Page";
import Paragraph from "../../../models/Paragraph";

const currentParagraph = async (page: PageDocument) => {
  return await Paragraph.getByID(
    page.paragraphs[page.paragraphs.length - 1]!.toString(),
    { fromCache: true }
  );
};

const relatedPages = async (page: PageDocument) => {
  return await page.getPagesThatReference({ fromCache: true });
};

const referencedCount = async (page: PageDocument) => {
  return await page.getReferencedCount({ fromCache: true });
};

export default {
  currentParagraph,
  relatedPages,
  referencedCount,
};
