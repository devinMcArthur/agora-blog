import { FieldResolver, Resolver, Root } from "type-graphql";

import QuestionPageConnectionClass from "../../../models/QuestionPageConnection/class";
import PageClass from "../../../models/Page/class";
import { PageDocument } from "../../../models/Page";
import fieldResolvers from "./fieldResolvers";
import { QuestionPageConnectionDocument } from "src/models/QuestionPageConnection";

@Resolver(() => QuestionPageConnectionClass)
export default class QuestionPageConnectionResolver {
  /**
   * Field Resolvers
   */
  @FieldResolver(() => PageClass)
  async referrerPage(
    @Root() questionPageConnection: QuestionPageConnectionDocument
  ): Promise<PageDocument> {
    return fieldResolvers.referrerPage(questionPageConnection);
  }
}