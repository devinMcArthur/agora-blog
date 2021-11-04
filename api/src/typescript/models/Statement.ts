import { Types } from "mongoose";
import { FileBuildData } from "./File";

export enum StyleTypes {
  mention = "mention",
  variable = "variable",
  quote = "quote",
  bold = "bold",
  image = "image",
  italic = "italic",
}

export enum StyleVariants {
  internal = "internal",
  external = "external",
}

interface IStyleValueImageBuildData {
  file: FileBuildData;
  sourceUrl?: string;
  caption?: string;
}

interface IStyleValueBuildData {
  url?: string;
  page?: Types.ObjectId | string;
  statement?: Types.ObjectId | string;
  variable?: Types.ObjectId | string;
  image?: IStyleValueImageBuildData;
}

export interface IStylesBuildData {
  type: StyleTypes;
  variant?: StyleVariants;
  value?: IStyleValueBuildData;
}

export interface IStringArrayBuildData {
  string?: string;
  styles: IStylesBuildData[];
}

export interface IStatementVersionData {
  stringArray: IStringArrayBuildData[];
  questions: Types.ObjectId[] | string[];
  newQuestions: string[];
  quotedStatement?: Types.ObjectId | string;
  sourceEditProposal?: Types.ObjectId | string;
}

export interface IStatementBuildData {
  page: Types.ObjectId | string;
  version: IStatementVersionData;
  author: Types.ObjectId | string;
}
