import { Arg, FieldResolver, ID, Query, Resolver, Root } from "type-graphql";
import { Types } from "mongoose";

import QuestionClass from "../../models/Question/class";
import Question, { QuestionDocument } from "../../models/Question";
import { PageDocument } from "../../models/Page";
import PageClass from "../../models/Page/class";

@Resolver(() => QuestionClass)
export default class QuestionResolver {
  /**
   * Field Resolvers
   */
  @FieldResolver(() => Number)
  async referencedCount(@Root() question: QuestionDocument): Promise<number> {
    return await question.getReferencedCount();
  }

  @FieldResolver(() => [PageClass])
  async relatedPages(
    @Root() question: QuestionDocument
  ): Promise<PageDocument[]> {
    return await question.getPagesThatReference();
  }

  /**
   * Queries
   */

  @Query(() => QuestionClass, { nullable: true })
  async question(
    @Arg("id", () => ID) id: Types.ObjectId
  ): Promise<QuestionDocument | null> {
    return await Question.findById(id);
  }

  @Query(() => [QuestionClass])
  async questions(): Promise<QuestionDocument[]> {
    return await Question.getList();
  }
}
