import { Types } from "mongoose";
import {
  Arg,
  Authorized,
  Ctx,
  FieldResolver,
  ID,
  Mutation,
  Query,
  Resolver,
  Root,
} from "type-graphql";

import {
  VariableClass,
  VariableDocument,
  PageDocument,
  PageClass,
  UserClass,
} from "@models";

import fieldResolvers from "./fieldResolvers";
import queries from "./queries";
import mutations, { NewVariableData } from "./mutations";
import { IContext } from "@typescript/graphql";

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

  @FieldResolver(() => UserClass)
  async originalAuthor(@Root() variable: VariableDocument) {
    return variable.getAuthor();
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

  @Query(() => [VariableClass])
  async searchVariables(@Arg("searchString") searchString: string) {
    return queries.searchVariables(searchString);
  }

  /**
   * ----- Mutations -----
   */

  @Mutation(() => String)
  async scrapeTest(@Arg("url") url: string, @Arg("id") id: string) {
    return mutations.scrape(url, id);
  }

  @Authorized("VERIFIED")
  @Mutation(() => VariableClass)
  async newVariable(@Arg("data") data: NewVariableData, @Ctx() ctx: IContext) {
    return mutations.newVariable(data, ctx);
  }
}
