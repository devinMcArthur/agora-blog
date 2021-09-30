export type SlateLeaf = {
  text: string;
  bold?: boolean;
  italic?: boolean;
  internalMentionPageId?: string;
  externalMentionUrl?: string;
  variableId?: string;
  quoteStatementId?: string;
};

export type SlateStatementElement = { children: SlateLeaf[] };
