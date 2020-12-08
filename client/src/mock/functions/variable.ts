import { Types } from "mongoose";

import Variable, {
  VariablePopulated,
  VariablePopulatedFull,
  VariableValueTypes,
} from "../../typescript/interfaces/documents/Variable";
import MockData from "../data";
import PageFunctions from "./page";
import VariablePageConnectionFunctions from "./variablePageConnection";

const findVariable = (variableID: Types.ObjectId) => {
  return MockData.variables.find((variable) => {
    return variable._id.toString() === variableID.toString();
  });
};

const populateVariable = (variable: Variable) => {
  const variableObject: VariablePopulated = JSON.parse(
    JSON.stringify(variable)
  );

  variableObject.versions[
    variableObject.versions.length - 1
  ].finalValue = getFinalValue(variable.versions[variable.versions.length - 1]);

  return variableObject;
};

const fullPopulateVariable = (variable: Variable) => {
  const populated = populateVariable(variable);

  const full: VariablePopulatedFull = JSON.parse(JSON.stringify(populated));

  const relatedPages = VariablePageConnectionFunctions.getPagesThatReference(
    variable._id
  ).map((page) => PageFunctions.populatePage(page!));

  full.relatedPages = relatedPages;

  return full;
};

const getFinalValue = (variableValue: VariableValueTypes) => {
  switch (variableValue.type) {
    case "number":
      return variableValue.number;
    case "equation":
      let equation = "";
      for (let i = 0; i < variableValue.equation.length; i++) {
        const item = variableValue.equation[i];
        if (item.type === "number") {
          equation += item.number;
        } else if (item.type === "operator") {
          equation += item.operator;
        } else if (item.type === "variable") {
          const variable = findVariable(item.variableID);
          equation += getFinalValue(
            variable?.versions[variable.versions.length - 1]!
          );
        }
      }
      // eslint-disable-next-line no-eval
      return eval(equation);
    default:
      return null;
  }
};

const VariableFunctions = {
  findVariable,
  populateVariable,
  fullPopulateVariable,
  getFinalValue,
};

export default VariableFunctions;
