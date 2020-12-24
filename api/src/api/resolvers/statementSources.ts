import { FieldResolver, Resolver, Root } from "type-graphql";

import Page, { PageDocument } from "../../models/Page";
import {
  StatementSourcesClass,
  StatementSourcesDocument,
} from "../../models/Statement/class";

@Resolver(() => StatementSourcesClass)
export default class StatementSourcesResolver {
  @FieldResolver()
  async pages(
    @Root() statementSources: StatementSourcesDocument
  ): Promise<PageDocument[] | null> {
    return await Page.find({
      _id: { $in: statementSources.pages.map((id) => id!.toString()) },
    });
  }
}
