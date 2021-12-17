import { Types } from "mongoose";

import { Question, Statement } from "@models";
import { Field, ID, InputType } from "type-graphql";
import { PaginationOptions } from "@graphql/types";

@InputType()
export class StatementsFromQuestionOptions extends PaginationOptions {
  @Field(() => ID, { nullable: true })
  public avoidPage?: Types.ObjectId;
}

const statement = async (id: Types.ObjectId) => {
  return await Statement.getById(id);
};

const statementsFromQuestion = async (
  questionId: Types.ObjectId,
  options?: StatementsFromQuestionOptions
) => {
  const question = await Question.getById(questionId);
  if (question) return question.getStatementReferences(options);
  else return [];
};

export default { statement, statementsFromQuestion };
