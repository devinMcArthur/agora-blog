export type SlateLeaf = {
  text: string;
  bold?: boolean;
  italic?: boolean;
  internalMentionPageId?: string;
  externalMentionUrl?: string;
  variableId?: string;
  quoteStatementId?: string;
};

export enum SlateMarks {
  bold = "bold",
  italic = "italic",
  internalMentionPageId = "internalMentionPageId",
  externalMentionUrl = "externalMentionUrl",
  variableId = "variableId",
  quoteStatementId = "quoteStatementId",
}

export enum SlateStyleTypes {
  bold = "bold",
  italic = "italic",
  link = "link",
  variable = "variable",
  quote = "quote",
}

export type SlateStatementElement = { children: SlateLeaf[] };
