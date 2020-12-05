import { Types } from "mongoose";

import MockData from "../data";

import Page, {
  PagePopulated,
  PagePopulatedFull,
} from "../../typescript/interfaces/documents/Page";

import ParagraphFunctions from "./paragraph";
import PageConnectionFunctions from "./pageConnections";

const getRootPages = () => {
  const pages = MockData.pages;

  let populatedPages: PagePopulated[] = [];
  pages.forEach((page) => {
    populatedPages.push(populatePage(page!)!);
  });

  // Sort by how many times the page is referenced
  populatedPages = populatedPages.sort(
    (a, b) => b.referencedCount - a.referencedCount
  );

  return populatedPages;
};

const findPage = (pageID: Types.ObjectId) => {
  return MockData.pages.find(
    (page) => page._id.toString() === pageID.toString()
  );
};

const findPageBySlug = (pageSlug?: string) => {
  return MockData.pages.find((page) => page.slug === pageSlug);
};

const populatePage = (page: Page) => {
  let populatedPage: PagePopulated = JSON.parse(JSON.stringify(page));

  // Find Current Paragraph
  let currentParagraph = ParagraphFunctions.findParagraph(
    page.paragraphVersionConnections[
      page.paragraphVersionConnections.length - 1
    ].paragraphID
  );

  if (currentParagraph) {
    const populatedCurrentParagraph = ParagraphFunctions.populateParagraph(
      currentParagraph
    );

    populatedPage.currentParagraph = populatedCurrentParagraph!;
  }

  // Times referenced
  populatedPage.referencedCount = PageConnectionFunctions.getReferencedCount(
    page._id
  );

  return populatedPage;
};

const fullPopulatePage = (page: Page) => {
  const populated = populatePage(page);

  const fullObject: PagePopulatedFull = JSON.parse(JSON.stringify(populated));

  const relatedPages = PageConnectionFunctions.getPagesThatReference(
    page._id
  ).map((page) => populatePage(page!));

  fullObject.relatedPages = relatedPages;

  return fullObject;
};

const PageFunctions = {
  getRootPages,
  findPage,
  findPageBySlug,
  populatePage,
  fullPopulatePage,
};

export default PageFunctions;
