import { Types } from "mongoose";
import { PagePopulated } from "./Page";

type ValueTypes =
  | { type: "number"; number: number }
  | { type: "equation"; equation: EquationTypes };

type EquationTypes = Array<
  | {
      type: "operator";
      operator: "(" | ")" | "+" | "-" | "/" | "*" | "^";
    }
  | { type: "number"; number: number }
  | { type: "variable"; variableID: Types.ObjectId }
>;

export default interface Variable {
  _id: Types.ObjectId;
  title: string;
  value: ValueTypes;
}

export interface VariablePopulated extends Variable {
  finalValue: number;
}

export interface VariablePopulatedFull extends VariablePopulated {
  relatedPages: PagePopulated[];
}
