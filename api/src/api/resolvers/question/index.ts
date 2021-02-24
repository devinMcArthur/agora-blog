import { Arg, FieldResolver, ID, Query, Resolver, Root } from "type-graphql";
import { Types } from "mongoose";

import QuestionClass from "../../../models/Question/class";
import { QuestionDocument } from "../../../models/Question";
import { PageDocument } from "../../../models/Page";
import PageClass from "../../../models/Page/class";
import fieldResolvers from "./fieldResolvers";
import queries from "./queries";
import QuestionPageConnectionClass from "../../../models/QuestionPageConnection/class";
import { QuestionPageConnectionDocument } from "../../../models/QuestionPageConnection";

@Resolver(() => QuestionClass)
export default class QuestionResolver {
  /**
   * Field Resolvers
   */
  @FieldResolver(() => Number)
  async referencedCount(@Root() question: QuestionDocument): Promise<number> {
    return fieldResolvers.referencedCount(question);
  }

  @FieldResolver(() => [QuestionPageConnectionClass])
  async pageConnections(
    @Root() question: QuestionDocument
  ): Promise<QuestionPageConnectionDocument[]> {
    return fieldResolvers.pageConnections(question);
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
}
