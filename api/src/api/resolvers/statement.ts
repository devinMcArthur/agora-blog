import { Arg, FieldResolver, ID, Query, Resolver, Root } from "type-graphql";

import StatementClass from "../../models/Statement/class";
import Statement, { StatementDocument } from "../../models/Statement";
import Page, { PageDocument } from "../../models/Page";
import { Types } from "mongoose";

@Resolver(() => StatementClass)
export default class StatementResolver {
  /**
   * Field Resolvers
   */

  @FieldResolver()
  async page(
    @Root() statement: StatementDocument
  ): Promise<PageDocument | null> {
    return await Page.findById(statement.page);
  }

  /**
   * Queries
   */

  @Query(() => StatementClass, { nullable: true })
  async statement(
    @Arg("id", () => ID) id: Types.ObjectId
  ): Promise<StatementDocument | null> {
    return await Statement.findById(id);
  }
}
