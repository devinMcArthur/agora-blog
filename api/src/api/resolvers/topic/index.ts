import Topic from "../../../models/Topic/class";
import { Resolver, Query, Arg, ID } from "type-graphql";
import { Types } from "mongoose";
import { TopicDocument } from "../../../models/Topic";
import queries from "./queries";

@Resolver(() => Topic)
export default class TopicResolver {
  /**
   * Queries
   */
  @Query(() => Topic, { nullable: true })
  async topic(
    @Arg("id", () => ID) id: Types.ObjectId
  ): Promise<TopicDocument | null> {
    return queries.topic(id);
  }
}
