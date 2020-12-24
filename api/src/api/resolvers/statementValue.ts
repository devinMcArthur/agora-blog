import { FieldResolver, Resolver, Root } from "type-graphql";

import Statement, { StatementDocument } from "../../models/Statement";
import Page, { PageDocument } from "../../models/Page";
import {
  StatementValueClass,
  StatementValueDocument,
} from "../../models/Statement/class";
import Variable, { VariableDocument } from "../../models/Variable";

@Resolver(() => StatementValueClass)
export default class StatementValueResolver {
  @FieldResolver()
  async page(
    @Root() statementValue: StatementValueDocument
  ): Promise<PageDocument | null> {
    return await Page.findById(statementValue.page);
  }

  @FieldResolver()
  async statement(
    @Root() statementValue: StatementValueDocument
  ): Promise<StatementDocument | null> {
    return await Statement.findById(statementValue.statement);
  }

  @FieldResolver()
  async variable(
    @Root() statementValue: StatementValueDocument
  ): Promise<VariableDocument | null> {
    return await Variable.findById(statementValue.variable);
  }
}
