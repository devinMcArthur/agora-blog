import { Arg, FieldResolver, ID, Query, Resolver, Root } from "type-graphql";
import { Types } from "mongoose";

import {
  QuestionClass,
  QuestionDocument,
  PageDocument,
  PageClass,
} from "@models";

import fieldResolvers from "./fieldResolvers";
import queries from "./queries";

@Resolver(() => QuestionClass)
export default class QuestionResolver {
  /**
   * Field Resolvers
   */
  @FieldResolver(() => Number)
  async referencedCount(@Root() question: QuestionDocument): Promise<number> {
    return fieldResolvers.referencedCount(question);
  }

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
    @Arg("id", () => ID) id: Types.ObjectId
  ): Promise<QuestionDocument | null> {
    return queries.question(id);
  }

  @Query(() => [QuestionClass])
  async questions(): Promise<QuestionDocument[]> {
    return queries.questions();
  }

  @Query(() => [QuestionClass])
  async searchQuestions(@Arg("searchString") searchString: string) {
    return queries.searchQuestions(searchString);
  }
}
