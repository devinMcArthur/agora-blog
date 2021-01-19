import { FieldResolver, Resolver, Root } from "type-graphql";

import { PageDocument } from "../../../models/Page";
import {
  StatementSourcesClass,
  StatementSourcesDocument,
} from "../../../models/Statement/class";
import fieldResolvers from "./fieldResolvers";

@Resolver(() => StatementSourcesClass)
export default class StatementSourcesResolver {
  @FieldResolver()
  async pages(
    @Root() statementSources: StatementSourcesDocument
  ): Promise<PageDocument[] | null> {
    return fieldResolvers.pages(statementSources);
  }
}
