import { FieldResolver, Resolver, Root } from "type-graphql";

import ParagraphClass from "../../../models/Paragraph/class";
import { PageDocument } from "../../../models/Page";
import { ParagraphDocument } from "../../../models/Paragraph";
import { StatementDocument } from "../../../models/Statement";

import fieldResolvers from "./fieldResolvers";

@Resolver(() => ParagraphClass)
export default class ParagraphResolver {
  @FieldResolver()
  async page(
    @Root() paragraph: ParagraphDocument
  ): Promise<PageDocument | null> {
    return fieldResolvers.page(paragraph);
  }

  @FieldResolver()
  async statements(
    @Root() paragraph: ParagraphDocument
  ): Promise<StatementDocument[]> {
    return fieldResolvers.statements(paragraph);
  }
}
