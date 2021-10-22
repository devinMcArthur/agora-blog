import { Descendant } from "slate";

export enum SlateMarks {
  bold = "bold",
  italic = "italic",
  internalMentionPage = "internalMentionPage",
  externalMentionUrl = "externalMentionUrl",
}

export enum SlateStyleTypes {
  bold = "bold",
  italic = "italic",
  link = "link",
  variable = "variable",
  quote = "quote",
  image = "image",
}

export type StyledText = {
  text: string;
  bold?: boolean;
  italic?: boolean;
  internalMentionPage?: {
    id: string;
    title: string;
  };
  externalMentionUrl?: string;
  highlight?: boolean;
};

export interface ISlateQuestion {
  _id: string;
  question: string;
}

export type StatementElementType = {
  type: "statement";
  statementId: string;
  index: number;
  questions: ISlateQuestion[];
  newQuestions: { question: string }[];
  children: Descendant[];
};

export type StatementElementContentType = {
  type: "statement-content";
  children: Descendant[];
};

export type VariableElementType = {
  type: "variable";
  id: string;
  title: string;
  finalValue: number;
  children: StyledText[];
};

export type QuoteElementType = {
  type: "quote";
  statementId: string;
  children: StyledText[];
};

export type ImageElementType = {
  type: "image";
  name: string;
  sourceURL?: string | null;
  caption?: string | null;
  buffer: string;
  contentType: string;
  children: StyledText[];
};

export type CustomElements =
  | VariableElementType
  | StatementElementType
  | StatementElementContentType
  | QuoteElementType
  | ImageElementType;
