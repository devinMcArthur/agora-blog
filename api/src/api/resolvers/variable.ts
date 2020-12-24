import { Arg, FieldResolver, ID, Query, Resolver, Root } from "type-graphql";

import VariableClass from "../../models/Variable/class";
import Variable, { VariableDocument } from "../../models/Variable";
import { PageDocument } from "../../models/Page";
import PageClass from "../../models/Page/class";
import { Types } from "mongoose";

@Resolver(() => VariableClass)
export default class VariableResolver {
  /**
   * Field Resolvers
   */
  @FieldResolver(() => Number)
  async finalValue(@Root() variable: VariableDocument): Promise<number> {
    return await variable.getFinalValue();
  }

  @FieldResolver(() => [PageClass])
  async relatedPages(
    @Root() variable: VariableDocument
  ): Promise<PageDocument[]> {
    return await variable.getPagesThatReference();
  }

  /**
   * Queries
   */

  @Query(() => VariableClass, { nullable: true })
  async variable(
    @Arg("id", () => ID) id: Types.ObjectId
  ): Promise<VariableDocument | null> {
    return await Variable.findById(id);
  }
}
