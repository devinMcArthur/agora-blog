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
  paragraphStatement?: {
    statement: Types.ObjectId | string;
    versionIndex: number;
  };
  questions?: Types.ObjectId[] | string[];
  newQuestions?: string[];
  stringArray?: IStringArrayBuildData[];
}

export interface IParagraphEditProposalBuildData {
  paragraph: Types.ObjectId | string;
  author: Types.ObjectId | string;
  description: string;
  statementItems: IParagraphEditProposalStatementData[];
}
