import { Types } from "mongoose";
import { VariablePageConnectionDocument, VariablePageConnectionModel } from ".";
import Page from "../../Page";
import { PageDocument } from "../../Page/functions";

export type VariablePageConnectionGetByVariableID = (
  variableID: Types.ObjectId | string
) => Promise<VariablePageConnectionDocument[]>;
const byVariableID = (
  VariablePageConnection: VariablePageConnectionModel,
  variableID: VariablePageConnectionGetByVariableID["arguments"]["variableID"]
) => {
  return new Promise(async (resolve, reject) => {
    try {
      const connections = await VariablePageConnection.find({ variableID });

      resolve(connections);
    } catch (e) {
      reject(e);
    }
  });
};

export type VariablePageConnectionGetPagesThatReferenceVariable = (
  variableID: Types.ObjectId | string
) => Promise<PageDocument[]>;
const pagesThatReferenceVariable = (
  VariablePageConnection: VariablePageConnectionModel,
  variableID: Types.ObjectId | string
) => {
  return new Promise(async (resolve, reject) => {
    try {
      const connections = await VariablePageConnection.getByVariableID(
        variableID
      );

      const pages: PageDocument[] = [];
      connections.forEach(async (connection) => {
        pages.push(
          await Page.getByID(connection.referrerPageID, { throwError: true })
        );
      });

      resolve(pages);
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  byVariableID,
  pagesThatReferenceVariable,
};
