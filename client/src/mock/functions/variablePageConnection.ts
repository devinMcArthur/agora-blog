import { Types } from "mongoose";

import Page from "../../typescript/interfaces/documents/Page";

import variablePageConnections from "../data/variablePageConnections";
import PageFunctions from "./page";

const getPagesThatReference = (variableID: Types.ObjectId) => {
  const pages: Page[] = [];
  variablePageConnections.forEach((connection) => {
    if (connection.variableID.toString() === variableID.toString()) {
      const page = PageFunctions.findPage(connection.referrerPageID);
      if (page) pages.push(page);
    }
  });

  return pages;
};

const getReferencedCount = (pageID: Types.ObjectId) => {
  return variablePageConnections.filter(
    (connection) => connection.variableID.toString() === pageID.toString()
  ).length;
};

const VariablePageConnectionFunctions = {
  getPagesThatReference,
  getReferencedCount,
};

export default VariablePageConnectionFunctions;
