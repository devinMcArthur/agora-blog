import { Types } from "mongoose";

import Page from "../../typescript/interfaces/documents/Page";

import pageConnections from "../data/pageConnections";
import PageFunctions from "./page";

const getPagesThatReference = (pageID: Types.ObjectId) => {
  const pages: Page[] = [];
  pageConnections.forEach((connection) => {
    if (connection.referencedPageID.toString() === pageID.toString()) {
      const page = PageFunctions.findPage(connection.referrerPageID);
      if (page) pages.push(page);
    }
  });

  return pages;
};

const getReferencedCount = (pageID: Types.ObjectId) => {
  return pageConnections.filter(
    (connection) => connection.referencedPageID.toString() === pageID.toString()
  ).length;
};

const PageConnectionFunctions = {
  getPagesThatReference,
  getReferencedCount,
};

export default PageConnectionFunctions;
