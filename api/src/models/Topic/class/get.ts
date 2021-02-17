import { Types } from "mongoose";
import { dispatch } from "nact";
import { cacheService } from "../../../server";
import GetByIDOptions from "../../../typescript/interface/getByID_Options";
import performCacheQuery from "../../../utils/performCacheQuery";
import populateOptions from "../../../utils/populateOptions";
import isEmpty from "../../../validation/isEmpty";
import { TopicDocument, TopicModel } from "..";

const byIDDefaultOptions: GetByIDOptions = {
  throwError: false,
  fromCache: false,
};
const byID = (
  Topic: TopicModel,
  id: Types.ObjectId | string,
  options: GetByIDOptions = byIDDefaultOptions
): Promise<TopicDocument | null> => {
  return new Promise(async (resolve, reject) => {
    try {
      options = populateOptions(options, byIDDefaultOptions);

      let topic: TopicDocument | null = null;
      if (options.fromCache) {
        const cachedTopic = await performCacheQuery({
          path: ["topics"],
          type: "GET_TOPIC",
          payload: { topicID: id },
        });
        if (!isEmpty(cachedTopic)) {
          topic = new Topic(cachedTopic);
        } else {
          dispatch(cacheService, {
            path: ["topics"],
            type: "SET_TOPIC",
            payload: { topicID: id },
          });
        }
      }

      if (!topic) topic = await Topic.findById(id);

      if (!topic && options.throwError) {
        throw new Error("Topic.getByID: Unable to find topic");
      }

      resolve(topic);
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  byID,
};
