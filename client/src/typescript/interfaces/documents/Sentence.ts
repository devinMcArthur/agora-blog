import { Types } from "mongoose";

import Page, { PagePopulated } from "./Page";
import Question from "./Question";
import { VariablePopulated } from "./Variable";

type StyleTypes = Array<
  | {
      type: "mention";
      variant: "internal";
      value: {
        pageID: Types.ObjectId;
      };
    }
  | {
      type: "mention";
      variant: "external";
      value: {
        url: string;
      };
    }
  | {
      type: "variable";
      value: {
        variableID: Types.ObjectId;
      };
    }
  | {
      type: "quote";
      value: {
        sentenceID: Types.ObjectId;
      };
    }
  | {
      type: "bold";
    }
>;

type PopulatedStyleTypes = Array<
  | {
      type: "mention";
      variant: "internal";
      value: {
        page: Page;
        pageID: Types.ObjectId;
      };
    }
  | {
      type: "mention";
      variant: "external";
      value: {
        url: string;
      };
    }
  | {
      type: "variable";
      value: {
        variable: VariablePopulated;
        variableID: Types.ObjectId;
      };
    }
  | {
      type: "quote";
      value: {
        page: Page;
        sentence: SentencePopulated;
        sentenceID: Types.ObjectId;
      };
    }
  | {
      type: "bold";
    }
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
