import { Types } from "mongoose";

import { ParagraphPopulated } from "./Paragraph";

export default interface Page {
  _id: Types.ObjectId;
  title: string;
  slug: string;
  paragraphVersionConnections: { paragraphID: Types.ObjectId }[];
  referencedBy?: { pageID: Types.ObjectId }[];
}

export interface PagePopulated extends Page {
  currentParagraph: ParagraphPopulated;
  referencedCount: number;
}

export interface PagePopulatedFull extends PagePopulated {
  relatedPages: PagePopulated[];
}
