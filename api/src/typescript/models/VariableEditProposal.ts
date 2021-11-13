import { Types } from "mongoose";
import { IVariableVersion } from "./Variable";

export interface IVariableEditProposalData {
  variable: Types.ObjectId | string;
  description: string;
  value: Omit<IVariableVersion, "sourceEditProposal">;
  author: Types.ObjectId | string;
}
