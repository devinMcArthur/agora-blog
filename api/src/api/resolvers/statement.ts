import { FieldResolver, Resolver, Root } from "type-graphql";

import StatementClass from "../../models/Statement/class";
import { StatementDocument } from "../../models/Statement";
import Page, { PageDocument } from "../../models/Page";

@Resolver(() => StatementClass)
export default class StatementResolver {
  @FieldResolver()
  async page(
    @Root() statement: StatementDocument
  ): Promise<PageDocument | null> {
    return await Page.findById(statement.page);
  }
}
