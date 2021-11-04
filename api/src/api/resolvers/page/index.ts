import {
  Arg,
  Args,
  ArgsType,
  Authorized,
  Ctx,
  Field,
  FieldResolver,
  ID,
  Mutation,
  Query,
  Resolver,
  Root,
} from "type-graphql";

import {
  ParagraphDocument,
  PageDocument,
  PageClass,
  ParagraphClass,
} from "@models";

import fieldResolver from "./fieldResolver";
import queries from "./queries";
import mutations, { NewPageData } from "./mutations";
import { IContext } from "@typescript/graphql";

@ArgsType()
class GetPageArgs {
  @Field(() => ID, { nullable: true })
  id?: string;

  @Field({ nullable: true })
  slug?: string;
}

@Resolver(() => PageClass)
export default class PageResolver {
  /**
   * Field Resolvers
   */
  @FieldResolver(() => ParagraphClass)
  async currentParagraph(
    @Root() page: PageDocument
  ): Promise<ParagraphDocument | null> {
    return fieldResolver.currentParagraph(page);
  }

  @FieldResolver(() => [PageClass])
  async relatedPages(@Root() page: PageDocument) {
    return fieldResolver.relatedPages(page);
  }

  @FieldResolver(() => Number)
  async referencedCount(@Root() page: PageDocument) {
    return fieldResolver.referencedCount(page);
  }

  /**
   * Queries
   */

  @Query(() => PageClass, { nullable: true })
  async page(
    @Args() { id, slug }: GetPageArgs
  ): Promise<PageDocument | null | undefined> {
    return queries.page({ id, slug });
  }

  @Query(() => [PageClass])
  async pages(): Promise<PageDocument[]> {
    return queries.pages();
  }

  @Query(() => [PageClass])
  async searchPages(@Arg("searchString") searchString: string) {
    return queries.searchPages(searchString);
  }

  /**
   * Mutations
   */

  @Authorized("VERIFIED")
  @Mutation(() => PageClass, { nullable: false })
  async newPage(@Arg("data") data: NewPageData, @Ctx() ctx: IContext) {
    return mutations.newPage(data, ctx);
  }
}
