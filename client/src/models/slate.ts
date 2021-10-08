import { Descendant } from "slate";

export enum SlateMarks {
  bold = "bold",
  italic = "italic",
  internalMentionPage = "internalMentionPage",
  externalMentionUrl = "externalMentionUrl",
  quoteStatementId = "quoteStatementId",
}

export enum SlateStyleTypes {
  bold = "bold",
  italic = "italic",
  link = "link",
  variable = "variable",
  quote = "quote",
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
  quoteStatementId?: string;
};

export type ParagraphElement = {
  type: "paragraph";
  children: Descendant[];
};

export type VariableElement = {
  type: "variable";
  id: string;
  title: string;
  finalValue: number;
  children: StyledText[];
};

export type CustomElements = VariableElement | ParagraphElement;
