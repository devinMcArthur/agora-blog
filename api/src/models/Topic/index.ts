import {
  getModelForClass,
  DocumentType,
  ReturnModelType,
} from "@typegoose/typegoose";
import TopicClass from "./class";

export default getModelForClass(TopicClass);

export interface TopicDocument extends DocumentType<TopicClass> {}

export interface TopicModel extends ReturnModelType<typeof TopicClass> {}
