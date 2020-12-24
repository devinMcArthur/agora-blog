import { FieldResolver, Resolver, Root } from "type-graphql";

import ParagraphClass from "../../models/Paragraph/class";
import Page, { PageDocument } from "../../models/Page";
import { ParagraphDocument } from "../../models/Paragraph";
import { StatementDocument } from "../../models/Statement";

@Resolver(() => ParagraphClass)
export default class ParagraphResolver {
  @FieldResolver()
  async page(
    @Root() paragraph: ParagraphDocument
  ): Promise<PageDocument | null> {
    return await Page.findById(paragraph.page);
  }

  @FieldResolver()
  async statements(
    @Root() paragraph: ParagraphDocument
  ): Promise<StatementDocument[]> {
    return await paragraph.getStatements();
  }
}
