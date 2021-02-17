import { PageDocument } from "../../../models/Page";
import { StatementDocument } from "../../../models/Statement";
import {
  TopicColumn,
  TopicColumnDocument,
} from "../../../models/Topic/schema/subDocuments";
import { VariableDocument } from "../../../models/Variable";
import { FieldResolver, Resolver, Root } from "type-graphql";
import fieldResolvers from "./fieldResolvers";

@Resolver(() => TopicColumn)
export default class TopicColumnResolver {
  /**
   * Field resolvers
   */

  @FieldResolver()
  async page(
    @Root() topicColumn: TopicColumnDocument
  ): Promise<PageDocument | null> {
    return fieldResolvers.page(topicColumn);
  }

  @FieldResolver()
  async statement(
    @Root() topicColumn: TopicColumnDocument
  ): Promise<StatementDocument | null> {
    return fieldResolvers.statement(topicColumn);
  }

  @FieldResolver()
  async pages(
    @Root() topicColumn: TopicColumnDocument
  ): Promise<PageDocument[] | null> {
    return fieldResolvers.pages(topicColumn);
  }

  @FieldResolver()
  async variables(
    @Root() topicColumn: TopicColumnDocument
  ): Promise<VariableDocument[] | null> {
    return fieldResolvers.variables(topicColumn);
  }
}
