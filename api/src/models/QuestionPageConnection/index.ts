import {
  getModelForClass,
  DocumentType,
  ReturnModelType,
} from "@typegoose/typegoose";
import QuestionPageConnectionClass from "./class";

export default getModelForClass(QuestionPageConnectionClass);

export interface QuestionPageConnectionDocument
  extends DocumentType<QuestionPageConnectionClass> {}

export interface QuestionPageConnectionModel
  extends ReturnModelType<typeof QuestionPageConnectionClass> {}
