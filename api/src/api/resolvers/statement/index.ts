import { Arg, FieldResolver, ID, Query, Resolver, Root } from "type-graphql";

import StatementClass from "../../../models/Statement/class";
import { StatementDocument } from "../../../models/Statement";
import { PageDocument } from "../../../models/Page";
import { Types } from "mongoose";
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
