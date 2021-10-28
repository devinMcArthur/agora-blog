import { Types } from "mongoose";
import { IStringArrayBuildData } from "./Statement";

export enum EditProposalChangeTypes {
  EDIT = "EDIT",
  ADD = "ADD",
  REMOVE = "REMOVE",
  NONE = "NONE",
}

interface IParagraphEditProposalStatementData {
  changeType: EditProposalChangeTypes;
  statement?: Types.ObjectId | string;
  questions?: Types.ObjectId[] | string[];
  newQuestions?: string[];
  stringArray?: IStringArrayBuildData[];
}

export interface IParagraphEditProposalBuildData {
  paragraph: Types.ObjectId | string;
  author: Types.ObjectId | string;
  description: string;
  statements: IParagraphEditProposalStatementData[];
}
