import { Types } from "mongoose";
import { Arg, FieldResolver, ID, Query, Resolver, Root } from "type-graphql";

import {
  VariableClass,
  VariableDocument,
  PageDocument,
  PageClass,
} from "@models";

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
