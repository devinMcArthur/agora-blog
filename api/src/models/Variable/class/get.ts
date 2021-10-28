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
} from "@models";
import GetByIDOptions from "@typescript/interface/getByID_Options";
import populateOptions from "@utils/populateOptions";

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
        throw new Error("Variable.getByID: Unable to find variable");
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
  Variable: VariableModel,
  variableValue: VariableVersionClass
): Promise<number> => {
  return new Promise(async (resolve, reject) => {
    try {
      switch (variableValue.type) {
        case "number":
          resolve(variableValue.number!);
          break;
        case "equation":
          let equation = "";
          for (let i = 0; i < variableValue.equation.length; i++) {
            const item = variableValue.equation[i];
            if (item.type === "number") {
              equation += item.number;
            } else if (item.type === "operator") {
              equation += item.operator;
            } else if (item.type === "variable") {
              const variable = await Variable.getByID(
                item.variable!.toString()
              );
              equation += await Variable.getVersionsFinalValue(
                variable?.versions[variable?.versions.length - 1]!
              );
            }
          }
          resolve(eval(equation));
          break;
      }
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
          const page = await Page.getByID(connection.referrerPage!.toString());
          if (page) pages.push(page);
        }
      }

      resolve(pages);
    } catch (e) {
      reject(e);
    }
  });
};

const search = (Variable: VariableModel, searchString: string) => {
  return new Promise<VariableDocument[]>(async (resolve, reject) => {
    try {
      /**
       * Partial Search
       */
      const partialSearch = async () => {
        const escapeRegex = (text: string) => {
          return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
        };

        return Variable.find({
          title: new RegExp(escapeRegex(searchString), "gi"),
        });
      };

      /**
       * Full Search
       */
      const fullSearch = async () => {
        return Variable.find({
          $text: { $search: searchString, $caseSensitive: false },
        });
      };

      /**
       * Final Combination
       */

      let variables: VariableDocument[] = await fullSearch();
      if (variables.length < 1) {
        variables = await partialSearch();
      }

      resolve(variables);
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  byID,
  finalValue,
  versionsFinalValue,
  pagesThatReference,
  search,
};
