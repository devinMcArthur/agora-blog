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

import Paragraph, { ParagraphDocument } from "../../models/Paragraph";
import Page, { PageDocument } from "../../models/Page";
import PageClass from "../../models/Page/class";
import ParagraphClass from "../../models/Paragraph/class";
import { Types } from "mongoose";

@ArgsType()
class GetPageArgs {
  @Field(() => ID, { nullable: true })
  id?: Types.ObjectId;

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
    return Paragraph.findById(page.paragraphs[page.paragraphs.length - 1]);
  }

  @FieldResolver(() => PageClass)
  async relatedPages(@Root() page: PageDocument) {
    return await page.getPagesThatReference();
  }

  @FieldResolver(() => PageClass)
  async referencedCount(@Root() page: PageDocument) {
    return await page.getReferencedCount();
  }

  /**
   * Queries
   */

  @Query(() => PageClass, { nullable: true })
  async page(@Args() { id, slug }: GetPageArgs): Promise<PageDocument | null> {
    if (id) {
      return await Page.getByID(id);
    } else if (slug) {
      return await Page.getBySlug(slug);
    } else {
      return null;
    }
  }

  @Query(() => [PageClass])
  async pages(): Promise<PageDocument[]> {
    return await Page.getList();
  }
}
