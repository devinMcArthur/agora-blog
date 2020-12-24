import {
  getModelForClass,
  DocumentType,
  ReturnModelType,
} from "@typegoose/typegoose";
import VariablePageConnectionClass from "./class";

export default getModelForClass(VariablePageConnectionClass);

export interface VariablePageConnectionDocument
  extends DocumentType<VariablePageConnectionClass> {}

export interface VariablePageConnectionModel
  extends ReturnModelType<typeof VariablePageConnectionClass> {}
