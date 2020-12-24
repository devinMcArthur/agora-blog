import {
  getModelForClass,
  DocumentType,
  ReturnModelType,
} from "@typegoose/typegoose";
import PageClass from "./class";

export default getModelForClass(PageClass);

export interface PageDocument extends DocumentType<PageClass> {}

export interface PageModel extends ReturnModelType<typeof PageClass> {}
