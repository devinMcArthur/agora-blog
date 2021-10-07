export * from "./Page";
export * from "./PageConnection";
export * from "./Paragraph";
export * from "./Question";
export * from "./QuestionPageConnection";
export * from "./Statement";
export * from "./Variable";
export * from "./VariablePageConnection";

import {
  getModelForClass,
  DocumentType,
  ReturnModelType,
} from "@typegoose/typegoose";

/**
 * ----- Page -----
 */

import { PageClass } from "./Page/class";

export interface PageDocument extends DocumentType<PageClass> {}

export interface PageModel extends ReturnModelType<typeof PageClass> {}

export const Page = getModelForClass(PageClass, {
  schemaOptions: { collection: "pages" },
});

/**
 * ----- Page Connection -----
 */

import { PageConnectionClass } from "./PageConnection/class";

export interface PageConnectionDocument
  extends DocumentType<PageConnectionClass> {}

export interface PageConnectionModel
  extends ReturnModelType<typeof PageConnectionClass> {}

export const PageConnection = getModelForClass(PageConnectionClass, {
  schemaOptions: { collection: "pageConnections" },
});

/**
 * ----- Paragraph -----
 */

import { ParagraphClass } from "./Paragraph/class";

export interface ParagraphDocument extends DocumentType<ParagraphClass> {}

export interface ParagraphModel
  extends ReturnModelType<typeof ParagraphClass> {}

export const Paragraph = getModelForClass(ParagraphClass, {
  schemaOptions: { collection: "paragraphs" },
});

/**
 * ----- Question -----
 */

import { QuestionClass } from "./Question/class";

export interface QuestionDocument extends DocumentType<QuestionClass> {}

export interface QuestionModel extends ReturnModelType<typeof QuestionClass> {}

export const Question = getModelForClass(QuestionClass, {
  schemaOptions: { collection: "questions" },
});

/**
 * ----- Question Page Connection -----
 */

import { QuestionPageConnectionClass } from "./QuestionPageConnection/class";

export interface QuestionPageConnectionDocument
  extends DocumentType<QuestionPageConnectionClass> {}

export interface QuestionPageConnectionModel
  extends ReturnModelType<typeof QuestionPageConnectionClass> {}

export const QuestionPageConnection = getModelForClass(
  QuestionPageConnectionClass,
  {
    schemaOptions: { collection: "questionPageConnections" },
  }
);

/**
 * ----- Statement -----
 */

import { StatementClass } from "./Statement/class";

export interface StatementDocument extends DocumentType<StatementClass> {}

export interface StatementModel
  extends ReturnModelType<typeof StatementClass> {}

export const Statement = getModelForClass(StatementClass, {
  schemaOptions: { collection: "statements" },
});

/**
 * ----- Variable -----
 */

import { VariableClass } from "./Variable/class";

export interface VariableDocument extends DocumentType<VariableClass> {}

export interface VariableModel extends ReturnModelType<typeof VariableClass> {}

export const Variable = getModelForClass(VariableClass, {
  schemaOptions: { collection: "variables" },
});

/**
 * ----- Variable Page Connection -----
 */

import { VariablePageConnectionClass } from "./VariablePageConnection/class";

export interface VariablePageConnectionDocument
  extends DocumentType<VariablePageConnectionClass> {}

export interface VariablePageConnectionModel
  extends ReturnModelType<typeof VariablePageConnectionClass> {}

export const VariablePageConnection = getModelForClass(
  VariablePageConnectionClass,
  {
    schemaOptions: { collection: "variablePageConnections" },
  }
);
