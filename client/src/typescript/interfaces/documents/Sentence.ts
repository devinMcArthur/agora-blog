import { Types } from "mongoose";

import Page, { PagePopulated } from "./Page";
import Question from "./Question";
import { VariablePopulated } from "./Variable";

export type InternalMentionStyleType = {
  type: "mention";
  variant: "internal";
  value: {
    pageID: Types.ObjectId;
  };
};

export type ExternalMentionStyleType = {
  type: "mention";
  variant: "external";
  value: {
    url: string;
  };
};

export type VariableStyleType = {
  type: "variable";
  value: {
    variableID: Types.ObjectId;
  };
};

export type QuoteStyleType = {
  type: "quote";
  value: {
    sentenceID: Types.ObjectId;
  };
};

export type BoldStyleType = {
  type: "bold";
};

export type StyleTypes = Array<
  | InternalMentionStyleType
  | ExternalMentionStyleType
  | VariableStyleType
  | QuoteStyleType
  | BoldStyleType
>;

export type PopulatedInternalMentionStyleType = InternalMentionStyleType & {
  value: {
    pageID: Types.ObjectId;
    page: Page;
  };
};

export type PopulatedVariableStyleType = VariableStyleType & {
  value: {
    variable: VariablePopulated;
    variableID: Types.ObjectId;
  };
};

export type PopulatedQuoteStyleType = QuoteStyleType & {
  value: {
    page: Page;
    sentence: SentencePopulated;
    sentenceID: Types.ObjectId;
  };
};

export type PopulatedStyleTypes = Array<
  | PopulatedInternalMentionStyleType
  | ExternalMentionStyleType
  | PopulatedVariableStyleType
  | PopulatedQuoteStyleType
  | BoldStyleType
>;

export default interface Sentence {
  _id: Types.ObjectId;
  pageID: Types.ObjectId;
  // Last version is most recent
  versions: {
    stringArray: {
      string?: string;
      styles: StyleTypes;
    }[];
    createdAt: Date;
  }[];
  sources?: {
    pages?: {
      pageID: Types.ObjectId;
    }[];
    urls?: {
      url: string;
    }[];
  };
  questionConnections:
    | {
        questionID: Types.ObjectId;
      }[]
    | [];
  current: boolean;
}

export interface SentencePopulated extends Sentence {
  versions: {
    stringArray: {
      string?: string;
      styles: PopulatedStyleTypes;
    }[];
    createdAt: Date;
  }[];
  sources?: {
    pages?: {
      pageID: Types.ObjectId;
      page: Page;
    }[];
    urls?: {
      url: string;
    }[];
  };
  questions: Question[];
}

export interface SentencePopulatedFull extends SentencePopulated {
  relatedPages: PagePopulated[];
}
