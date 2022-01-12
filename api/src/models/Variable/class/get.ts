import { Types } from "mongoose";

import {
  VariableDocument,
  VariableModel,
  VariableVersionClass,
  Page,
  PageDocument,
  VariablePageConnection,
  VariablePageConnectionDocument,
  Variable,
  UserDocument,
  User,
  VariableEditProposalDocument,
  VariableEditProposal,
} from "@models";
import GetByIDOptions from "@typescript/interface/getById_Options";
import populateOptions from "@utils/populateOptions";
import getVariableVersionValue from "@utils/getVariableVersionValue";
import ElasticsearchClient from "@elasticsearch/client";

const byIDDefaultOptions: GetByIDOptions = {
  throwError: false,
};
const byID = (
  Variable: VariableModel,
  id: Types.ObjectId | string,
  options: GetByIDOptions = byIDDefaultOptions
): Promise<VariableDocument | null> => {
  return new Promise(async (resolve, reject) => {
    try {
      options = populateOptions(options, byIDDefaultOptions);

      const variable = await Variable.findById(id);

      if (!variable && options.throwError) {
        throw new Error("Variable.getById: Unable to find variable");
      }

      resolve(variable);
    } catch (e) {
      reject(e);
    }
  });
};

const finalValue = (variable: VariableDocument): Promise<number> => {
  return new Promise(async (resolve, reject) => {
    try {
      const value = await Variable.getVersionsFinalValue(
        variable.versions[variable.versions.length - 1]
      );

      resolve(value);
    } catch (e) {
      reject(e);
    }
  });
};

const versionsFinalValue = (
  _: VariableModel,
  variableValue: VariableVersionClass
): Promise<number> => {
  return new Promise(async (resolve, reject) => {
    try {
      resolve(await getVariableVersionValue(variableValue));
    } catch (e) {
      reject(e);
    }
  });
};

const pagesThatReference = (
  variable: VariableDocument
): Promise<PageDocument[]> => {
  return new Promise(async (resolve, reject) => {
    try {
      const pages: PageDocument[] = [];

      if (pages.length === 0) {
        const variablePageConnections: VariablePageConnectionDocument[] =
          await VariablePageConnection.find({
            variable: variable._id,
          });

        for (const connection of variablePageConnections) {
          const page = await Page.getById(connection.referrerPage!.toString());
          if (page) pages.push(page);
        }
      }

      resolve(pages);
    } catch (e) {
      reject(e);
    }
  });
};

const search = (
  Variable: VariableModel,
  searchString: string,
  limit?: number
) => {
  return new Promise<VariableDocument[]>(async (resolve, reject) => {
    try {
      const res = await ElasticsearchClient.search({
        index: "variable",
        body: {
          query: {
            match: {
              "variable.title": {
                query: searchString,
                fuzziness: "AUTO",
              },
            },
          },
        },
        size: limit,
      });

      const variableIds: string[] = res.body.hits.hits.map(
        (item: any) => item._id
      );

      const variables: VariableDocument[] = [];
      for (let i = 0; i < variableIds.length; i++) {
        const variable = await Variable.getById(variableIds[i]);
        if (variable) variables.push(variable);
      }

      resolve(variables);
    } catch (e) {
      reject(e);
    }
  });
};

const author = (variable: VariableDocument) => {
  return new Promise<UserDocument>(async (resolve, reject) => {
    try {
      const author = await User.getById(variable.originalAuthor!.toString());
      if (!author) throw new Error("unable to find author");

      resolve(author);
    } catch (e) {
      reject(e);
    }
  });
};

const byTitle = (Variable: VariableModel, title: string) => {
  return new Promise<VariableDocument | null>(async (resolve, reject) => {
    try {
      const variable = await Variable.findOne({
        title: { $regex: new RegExp(`^${title}`, "i") },
      });

      resolve(variable);
    } catch (e) {
      reject(e);
    }
  });
};

const editProposals = (variable: VariableDocument) => {
  return new Promise<VariableEditProposalDocument[]>(
    async (resolve, reject) => {
      try {
        const variableEditProposals = await VariableEditProposal.find({
          variableVersionIndex: variable.versions.length - 1,
          variable: variable._id,
        });

        resolve(variableEditProposals);
      } catch (e) {
        reject(e);
      }
    }
  );
};

export default {
  byID,
  byTitle,
  author,
  finalValue,
  versionsFinalValue,
  pagesThatReference,
  search,
  editProposals,
};
