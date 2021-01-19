import {
  Args,
  ArgsType,
  Field,
  FieldResolver,
  ID,
  Query,
  Resolver,
  Root,
} from "type-graphql";

import { ParagraphDocument } from "../../../models/Paragraph";
import { PageDocument } from "../../../models/Page";
import PageClass from "../../../models/Page/class";
import ParagraphClass from "../../../models/Paragraph/class";

import fieldResolver from "./fieldResolver";
import queries from "./queries";

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
}
