import {
  Arg,
  Args,
  FieldResolver,
  ID,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import { Types } from "mongoose";

import {
  QuestionClass,
  QuestionDocument,
  PageDocument,
  PageClass,
} from "@models";

import fieldResolvers from "./fieldResolvers";
import queries, { GetQuestionArgs } from "./queries";
import { ListOptionData } from "@typescript/graphql";

@Resolver(() => QuestionClass)
export default class QuestionResolver {
  /**
   * Field Resolvers
   */

  @FieldResolver(() => [PageClass])
  async relatedPages(
    @Root() question: QuestionDocument
  ): Promise<PageDocument[]> {
    return fieldResolvers.relatedPages(question);
  }

  /**
   * Queries
   */

  @Query(() => QuestionClass, { nullable: true })
  async question(
    @Args() { id, slug }: GetQuestionArgs
  ): Promise<QuestionDocument | null> {
    return queries.question({ id, slug });
  }

  @Query(() => [QuestionClass])
  async questions(
    @Arg("options", () => ListOptionData, { nullable: true })
    options?: ListOptionData
  ): Promise<QuestionDocument[]> {
    return queries.questions(options);
  }

  @Query(() => [QuestionClass])
  async searchQuestions(
    @Arg("searchString") searchString: string,
    @Arg("limit", { nullable: true }) limit?: number
  ) {
    return queries.searchQuestions(searchString, limit);
  }
}
