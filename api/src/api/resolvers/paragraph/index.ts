import { FieldResolver, Resolver, Root } from "type-graphql";

import {
  ParagraphClass,
  PageDocument,
  ParagraphDocument,
  StatementDocument,
  PageClass,
  StatementClass,
  ParagraphEditProposalClass,
} from "@models";

import fieldResolvers from "./fieldResolvers";

@Resolver(() => ParagraphClass)
export default class ParagraphResolver {
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
}
