import { Types } from "mongoose";

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
  name: string;
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

interface IStylesBuildData {
  type: StyleTypes;
  variant?: StyleVariants;
  value?: IStyleValueBuildData;
}

export interface IStringArrayBuildData {
  string?: string;
  styles: IStylesBuildData[];
}
