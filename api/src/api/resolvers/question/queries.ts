import { Types } from "mongoose";

import { Question } from "@models";
import { ListOptionData } from "@typescript/graphql";
import { ArgsType, Field, ID } from "type-graphql";

@ArgsType()
export class GetQuestionArgs {
  @Field(() => ID, { nullable: true })
  id?: string;

  @Field({ nullable: true })
  slug?: string;
}

const question = async ({ id, slug }: GetQuestionArgs) => {
  if (id) {
    return Question.getById(id);
  } else if (slug) {
    return Question.getBySlug(slug);
  } else {
    return null;
  }
};

const questions = async (options?: ListOptionData) => {
  return await Question.getList(options);
};

const searchQuestions = async (searchString: string, limit?: number) => {
  return Question.search(searchString, limit);
};

export default {
  question,
  questions,
  searchQuestions,
};
