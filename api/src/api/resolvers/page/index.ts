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

import requestip from "request-ip";
import {
  ParagraphDocument,
  PageDocument,
  PageClass,
  ParagraphClass,
} from "@models";

import fieldResolver from "./fieldResolver";
import queries from "./queries";
import mutations, { NewPageData } from "./mutations";
import { IContext, ListOptionData } from "@typescript/graphql";

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

  @FieldResolver(() => String)
  async description(@Root() page: PageDocument) {
    return page.getDescription();
  }

  /**
   * Queries
   */

  @Query(() => PageClass, { nullable: true })
  async page(
    @Args() { id, slug }: GetPageArgs,
    @Ctx() ctx: IContext
  ): Promise<PageDocument | null | undefined> {
    console.log(await requestip.getClientIp(ctx.req));
    return queries.page({ id, slug });
  }

  @Query(() => [PageClass])
  async pages(
    @Arg("options", () => ListOptionData, { nullable: true })
    options?: ListOptionData
  ): Promise<PageDocument[]> {
    return queries.pages(options);
  }

  @Query(() => [PageClass])
  async searchPages(
    @Arg("searchString") searchString: string,
    @Arg("limit", { nullable: true }) limit?: number
  ) {
    return queries.searchPages(searchString, limit);
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
