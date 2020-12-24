import {
  getModelForClass,
  DocumentType,
  ReturnModelType,
} from "@typegoose/typegoose";
import StatementClass from "./class";

export default getModelForClass(StatementClass);

export interface StatementDocument extends DocumentType<StatementClass> {}

export interface StatementModel
  extends ReturnModelType<typeof StatementClass> {}
