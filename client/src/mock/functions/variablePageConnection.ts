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

const VariablePageConnectionFunctions = {
  getPagesThatReference,
};

export default VariablePageConnectionFunctions;
