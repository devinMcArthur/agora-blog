import {
  getModelForClass,
  DocumentType,
  ReturnModelType,
} from "@typegoose/typegoose";
import QuestionClass from "./class";

export default getModelForClass(QuestionClass);

export interface QuestionDocument extends DocumentType<QuestionClass> {}

export interface QuestionModel extends ReturnModelType<typeof QuestionClass> {}
