import {
  DocumentType,
  getModelForClass,
  ReturnModelType,
} from "@typegoose/typegoose";

import ParagraphClass from "./class";

export default getModelForClass(ParagraphClass);

export interface ParagraphDocument extends DocumentType<ParagraphClass> {}

export interface ParagraphModel
  extends ReturnModelType<typeof ParagraphClass> {}
