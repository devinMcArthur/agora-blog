import { Types } from "mongoose";
import { dispatch } from "nact";

import { VariableDocument, VariableModel } from "..";
import { VariableVersionClass } from ".";
import GetByIDOptions from "../../../typescript/interface/getByID_Options";
import populateOptions from "../../../utils/populateOptions";
import Page, { PageDocument } from "../../Page";
import VariablePageConnection, {
  VariablePageConnectionDocument,
} from "../../VariablePageConnection";
import performCacheQuery from "../../../utils/performCacheQuery";
import isEmpty from "../../../validation/isEmpty";
import { cacheService } from "../../../server";

const byIDDefaultOptions: GetByIDOptions = {
  throwError: false,
  fromCache: false,
};
const byID = (
  Variable: VariableModel,
  id: Types.ObjectId | string,
  options: GetByIDOptions = byIDDefaultOptions
): Promise<VariableDocument | null> => {
  return new Promise(async (resolve, reject) => {
    try {
      options = populateOptions(options, byIDDefaultOptions);

      let variable: VariableDocument | null = null;
      if (options.fromCache) {
        const cachedVariable = await performCacheQuery({
          path: ["variables"],
          type: "GET_VARIABLE",
          payload: { variableID: id },
        });
        if (!isEmpty(cachedVariable)) {
          variable = new Variable(cachedVariable);
        } else {
          dispatch(cacheService, {
            path: ["variables"],
            type: "SET_VARIABLE",
            payload: { variableID: id },
          });
        }
      }

      if (!variable) variable = await Variable.findById(id);

      if (!variable && options.throwError) {
        throw new Error("Variable.getByID: Unable to find variable");
      }

      resolve(variable);
    } catch (e) {
      reject(e);
    }
  });
};

const finalValueDefaultOptions = {
  fromCache: false,
};
const finalValue = (
  variable: VariableDocument,
  options = finalValueDefaultOptions
): Promise<number> => {
  return new Promise(async (resolve, reject) => {
    try {
      options = populateOptions(options, finalValueDefaultOptions);

      let value: number = 0;
      if (options.fromCache) {
        const cachedValue = await performCacheQuery({
          path: ["variables"],
          type: "GET_VARIABLE",
          payload: { variableID: variable._id },
        });
        if (cachedValue.finalValue) {
          value = cachedValue.finalValue;
        } else {
          dispatch(cacheService, {
            path: ["variables"],
            type: "SET_VARIABLE",
            payload: { variableID: variable._id },
          });
        }
      }

      if (value === 0) {
        value = await variable
          .model("VariableClass")
          // @ts-expect-error: TS doesn't recognize the use of '.model(ClassName)'
          .getVersionsFinalValue(
            variable.versions[variable.versions.length - 1]
          );
      }

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
                item.variable!.toString(),
                { fromCache: true }
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

const pagesThatReferenceDefaultOptions = {
  fromCache: false,
};
const pagesThatReference = (
  variable: VariableDocument,
  options = pagesThatReferenceDefaultOptions
): Promise<PageDocument[]> => {
  return new Promise(async (resolve, reject) => {
    try {
      options = populateOptions(options, pagesThatReferenceDefaultOptions);

      const pages: PageDocument[] = [];
      if (options.fromCache) {
        const cachedVariable = await performCacheQuery({
          path: ["variables"],
          type: "GET_VARIABLE",
          payload: { variableID: variable._id },
        });
        if (cachedVariable.relatedPages) {
          for (let i = 0; i < cachedVariable.relatedPages.length; i++) {
            pages[i] = new Page(cachedVariable.relatedPages[i]);
          }
        } else {
          dispatch(cacheService, {
            path: ["variables"],
            type: "SET_VARIABLE",
            payload: { variableID: variable._id },
          });
        }
      }

      if (pages.length === 0) {
        const variablePageConnections: VariablePageConnectionDocument[] = await VariablePageConnection.find(
          {
            variable: variable._id,
          }
        );

        for (const connection of variablePageConnections) {
          const page = await Page.getByID(connection.referrerPage!.toString(), {
            fromCache: true,
          });
          if (page) pages.push(page);
        }
      }

      resolve(pages);
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
};
