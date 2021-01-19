import { Arg, FieldResolver, ID, Query, Resolver, Root } from "type-graphql";

import VariableClass from "../../../models/Variable/class";
import { VariableDocument } from "../../../models/Variable";
import { PageDocument } from "../../../models/Page";
import PageClass from "../../../models/Page/class";
import { Types } from "mongoose";
import fieldResolvers from "./fieldResolvers";
import queries from "./queries";

@Resolver(() => VariableClass)
export default class VariableResolver {
  /**
   * Field Resolvers
   */
  @FieldResolver(() => Number)
  async finalValue(@Root() variable: VariableDocument): Promise<number> {
    return fieldResolvers.finalValue(variable);
  }

  @FieldResolver(() => [PageClass])
  async relatedPages(
    @Root() variable: VariableDocument
  ): Promise<PageDocument[]> {
    return fieldResolvers.relatedPages(variable);
  }

  /**
   * Queries
   */

  @Query(() => VariableClass, { nullable: true })
  async variable(
    @Arg("id", () => ID) id: Types.ObjectId
  ): Promise<VariableDocument | null> {
    return queries.variable(id);
  }
}
