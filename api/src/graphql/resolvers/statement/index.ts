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
  StatementClass,
  StatementDocument,
  PageDocument,
  PageClass,
} from "@models";

import fieldResolvers from "./fieldResolvers";
import queries, { StatementsFromQuestionOptions } from "./queries";

@Resolver(() => StatementClass)
export default class StatementResolver {
  /**
   * Field Resolvers
   */

  @FieldResolver(() => PageClass)
  async page(
    @Root() statement: StatementDocument
  ): Promise<PageDocument | null> {
    return fieldResolvers.page(statement);
  }

  /**
   * Queries
   */

  @Query(() => StatementClass, { nullable: true })
  async statement(
    @Arg("id", () => ID) id: Types.ObjectId
  ): Promise<StatementDocument | null> {
    return queries.statement(id);
  }

  @Query(() => [StatementClass])
  async statementsFromQuestion(
    @Arg("questionId", () => ID) questionId: Types.ObjectId,
    @Arg("options", { nullable: true }) options?: StatementsFromQuestionOptions
  ) {
    return queries.statementsFromQuestion(questionId, options);
  }
}
