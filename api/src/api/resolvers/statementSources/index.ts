import { FieldResolver, Resolver, Root } from "type-graphql";

import {
  PageDocument,
  StatementSourcesClass,
  StatementSourcesDocument,
} from "@models";

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
