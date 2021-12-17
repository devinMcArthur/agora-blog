import { PageDocument, Paragraph } from "@models";

const currentParagraph = async (page: PageDocument) => {
  return await Paragraph.getById(
    page.paragraphs[page.paragraphs.length - 1]!.toString(),
  );
};

const relatedPages = async (page: PageDocument) => {
  return await page.getPagesThatReference();
};

const referencedCount = async (page: PageDocument) => {
  return await page.getReferencedCount();
};

export default {
  currentParagraph,
  relatedPages,
  referencedCount,
};
