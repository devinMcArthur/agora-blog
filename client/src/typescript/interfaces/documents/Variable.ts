import { Types } from "mongoose";
import { PagePopulated } from "./Page";

export type VariableValueTypes =
  | { type: "number"; number: number; sourceURL: string; createdAt: Date }
  | {
      type: "equation";
      equation: EquationTypes;
      sourceURL?: string;
      createdAt: Date;
    };

export type PopulatedVariableValueTypes =
  | {
      type: "number";
      number: number;
      sourceURL: string;
      createdAt: Date;
      finalValue: number;
    }
  | {
      type: "equation";
      equation: EquationTypes;
      sourceURL: string;
      createdAt: Date;
      finalValue: number;
    };

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
  versions: Array<VariableValueTypes>;
}

export interface VariablePopulated extends Variable {
  versions: Array<PopulatedVariableValueTypes>;
}

export interface VariablePopulatedFull extends VariablePopulated {
  relatedPages: PagePopulated[];
}
