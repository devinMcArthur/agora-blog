import { Arg, FieldResolver, Query, Resolver, Root } from "type-graphql";

import {
  ParagraphClass,
  PageDocument,
  ParagraphDocument,
  PageClass,
  ParagraphEditProposalClass,
} from "@models";

import queries from "./queries";
import fieldResolvers from "./fieldResolvers";

@Resolver(() => ParagraphClass)
export default class ParagraphResolver {
  /**
   * ----- Field Resolvers -----
   */

  @FieldResolver(() => PageClass)
  async page(
    @Root() paragraph: ParagraphDocument
  ): Promise<PageDocument | null> {
    return fieldResolvers.page(paragraph);
  }

  @FieldResolver(() => [ParagraphEditProposalClass])
  async editProposals(@Root() paragraph: ParagraphDocument) {
    return paragraph.getEditProposals();
  }

  /**
   * ----- Queries -----
   */

  @Query(() => ParagraphClass)
  async paragraph(@Arg("id") id: string) {
    return queries.paragraph(id);
  }
}
