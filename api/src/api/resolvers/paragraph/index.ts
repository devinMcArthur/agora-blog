import { FieldResolver, Resolver, Root } from "type-graphql";

import {
  ParagraphClass,
  PageDocument,
  ParagraphDocument,
  StatementDocument,
  PageClass,
  StatementClass,
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

  @FieldResolver(() => [StatementClass])
  async statements(
    @Root() paragraph: ParagraphDocument
  ): Promise<StatementDocument[]> {
    return fieldResolvers.statements(paragraph);
  }
}
