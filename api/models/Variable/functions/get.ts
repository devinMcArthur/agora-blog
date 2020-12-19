import AgoraTypes from "@devin_mcarthur/agora-types";
import { Types } from "mongoose";
import { VariableDocument, VariableModel } from ".";
import GetByIDOptions from "../../../typescript/interface/getByID_Options";
import populateOptions from "../../../utils/populateOptions";

type VariableGetPopulatedReturn<
  opts extends GetByIDOptions
> = opts["populate"] extends "normal"
  ? // Return populated document if options.populate === "normal"
    Promise<AgoraTypes.Variable.Documents.VariablePopulated>
  : opts["populate"] extends "full"
  ? // Return fully populated document if options.populate === "full"
    Promise<AgoraTypes.Variable.Documents.VariablePopulatedFull>
  : // Return Variable Document if none of the above
    Promise<VariableDocument>;

type VariableGetReturn<
  opts extends GetByIDOptions
> = opts["throwError"] extends true
  ? // Returns normal document if options.populate === "none"
    VariableGetPopulatedReturn<opts>
  : // Will either return the 3 document types or null if throwError=false
    VariableGetPopulatedReturn<opts> | null;

export type VariableGetByID = <opts extends GetByIDOptions>(
  variableID: Types.ObjectId,
  options: opts
) => VariableGetReturn<opts>;
const byIDDefaultOptions: GetByIDOptions = {
  throwError: false,
  populate: "none",
};
const byID = (
  Variable: VariableModel,
  id: Types.ObjectId | string,
  options: GetByIDOptions = byIDDefaultOptions
) => {
  return new Promise(async (resolve, reject) => {
    try {
      options = populateOptions(options, byIDDefaultOptions);
      const variable = await Variable.findById(id);

      if (!variable && options.throwError) {
        throw new Error("Variable.getByID: Unable to find variable");
      }

      if (options.populate === "normal") {
        resolve(await variable?.populateNormal());
      } else if (options.populate === "full") {
        resolve(await variable?.populateFull());
      }

      resolve(variable);
    } catch (e) {
      reject(e);
    }
  });
};

export type VariableGetFinalValue = (
  variableValue: AgoraTypes.Variable.Types.VariableValueTypes
) => Promise<number>;
const finalValue = (
  Variable: VariableModel,
  variableValue: AgoraTypes.Variable.Types.VariableValueTypes
) => {
  return new Promise<number | void>(async (resolve, reject) => {
    try {
      switch (variableValue.type) {
        case "number":
          resolve(variableValue.number);
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
              const variable = await Variable.getByID(item.variableID, {
                throwError: true,
              });
              equation += await Variable.getFinalValue(
                variable?.versions[variable.versions.length - 1]
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

export default {
  byID,
  finalValue,
};
