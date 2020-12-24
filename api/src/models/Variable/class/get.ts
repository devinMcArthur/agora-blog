import { Types } from "mongoose";
import Variable, { VariableDocument, VariableModel } from "..";
import { VariableVersionClass } from ".";
import GetByIDOptions from "../../../typescript/interface/getByID_Options";
import populateOptions from "../../../utils/populateOptions";
import Page, { PageDocument } from "../../Page";
import VariablePageConnection, {
  VariablePageConnectionDocument,
} from "../../VariablePageConnection";

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
      const value = await variable
        .model("VariableClass")
        // @ts-expect-error: TS doesn't recognize the use of '.model(ClassName)'
        .getVersionsFinalValue(variable.versions[variable.versions.length - 1]);

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
              const variable = await Variable.findById(item.variable, {
                throwError: true,
              });
              equation += await Variable.getVersionsFinalValue(
                variable?.versions[variable.versions.length - 1]!
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
      const variablePageConnections: VariablePageConnectionDocument[] = await VariablePageConnection.find(
        {
          variable: variable._id,
        }
      );

      const pages: PageDocument[] = [];

      for (const connection of variablePageConnections) {
        const page = await Page.findById(connection.referrerPage);
        if (page) pages.push(page);
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
