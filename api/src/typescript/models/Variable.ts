import { Types } from "mongoose";

export enum VariableVersionTypes {
  number = "number",
  equation = "equation",
}

export enum VariableEquationTypes {
  operator = "operator",
  variable = "variable",
  number = "number",
}

export enum VariableOperatorTypes {
  OpenBracket = "(",
  CloseBracket = ")",
  Plus = "+",
  Minus = "-",
  Divide = "/",
  Multiply = "*",
  Exponential = "^",
  Mod = "%",
}

export interface IVariableEquationItem {
  type: VariableEquationTypes;
  operator?: VariableOperatorTypes;
  number?: number;
  variable?: Types.ObjectId | string;
}

export interface IVariableVersion {
  type: VariableVersionTypes;
  sourceUrl?: string;
  number?: number;
  equation?: IVariableEquationItem[];
  sourceEditProposal?: Types.ObjectId | string;
}

export interface IVariableBuildData {
  title: string;
  version: IVariableVersion;
  author: Types.ObjectId | string;
}
