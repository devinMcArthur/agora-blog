import { Types } from "mongoose";

import MockData from "../data";

import Page, {
  PagePopulated,
  PagePopulatedFull,
} from "../../typescript/interfaces/documents/Page";

import ParagraphFunctions from "./paragraph";
import SentenceFunctions from "./sentence";

const getRootPages = () => {
  const pages = MockData.pages;

  const populatedPages: PagePopulated[] = [];
  pages.forEach((page) => {
    populatedPages.push(populatePage(page!)!);
  });

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

    populatedPage = {
      ...page,
      currentParagraph: populatedCurrentParagraph!,
    };
  }

  return populatedPage;
};

const fullPopulatePage = (page: Page) => {
  const populated = populatePage(page);

  const fullObject: PagePopulatedFull = JSON.parse(JSON.stringify(populated));

  // Get all sentences that reference this page
  const sentencesThatReference = SentenceFunctions.findSentenceThatReferencesPage(
    page._id
  );

  // Get all pageIDs these sentences are linked to
  let pageIDs = sentencesThatReference.map((sentence) => sentence.pageID);

  // Make list unique
  pageIDs = pageIDs.filter((id, index) => pageIDs.indexOf(id) === index);

  // Get and populate all pages
  let relatedPages = pageIDs.map((id) => {
    const page = findPage(id);
    return populatePage(page!);
  });

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
