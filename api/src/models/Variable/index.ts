import {
  getModelForClass,
  DocumentType,
  ReturnModelType,
} from "@typegoose/typegoose";
import VariableClass from "./class";

export default getModelForClass(VariableClass);

export interface VariableDocument extends DocumentType<VariableClass> {}

export interface VariableModel extends ReturnModelType<typeof VariableClass> {}
