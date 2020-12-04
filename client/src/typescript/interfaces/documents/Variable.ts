import { Types } from "mongoose";

type ValueTypes = { number: number } | { equation: EquationTypes };

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
  type: "number" | "equation";
  value: ValueTypes;
}

export interface VariablePopulated extends Variable {
  finalValue: number;
}
