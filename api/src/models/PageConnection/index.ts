import {
  getModelForClass,
  DocumentType,
  ReturnModelType,
} from "@typegoose/typegoose";
import PageConnectionClass from "./class";

export default getModelForClass(PageConnectionClass);

export interface PageConnectionDocument
  extends DocumentType<PageConnectionClass> {}

export interface PageConnectionModel
  extends ReturnModelType<typeof PageConnectionClass> {}
