import { Arg, FieldResolver, ID, Query, Resolver, Root } from "type-graphql";
import { Types } from "mongoose";

import { StatementClass, StatementDocument, PageDocument } from "@models";

import fieldResolvers from "./fieldResolvers";
import queries from "./queries";

@Resolver(() => StatementClass)
export default class StatementResolver {
  /**
   * Field Resolvers
   */

  @FieldResolver()
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
}
