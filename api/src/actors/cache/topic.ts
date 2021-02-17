import { Types } from "mongoose";
import { dispatch, spawn, spawnStateless } from "nact";

import Topic from "../../models/Topic";

const spawn_topics_service = (cacheActor: any) =>
  spawnStateless(
    cacheActor,
    (msg, ctx) => {
      const topicID = msg.payload.topicID;

      let childActor: any;

      if (topicID) {
        if (ctx.children.has(topicID.toString())) {
          childActor = ctx.children.get(topicID.toString());
        } else {
          childActor = spawn_topic_service(ctx.self, topicID);
        }
      }

      if (childActor) dispatch(childActor, msg);
    },
    "topics"
  );

export const CacheProtocolTypes = {
  GET_TOPIC: "GET_TOPIC",
  SET_TOPIC: "SET_TOPIC",
  UPDATE_TOPIC: "UPDATE_TOPIC",
  SUCCESS: "SUCCESS",
};

const spawn_topic_service = (parent: any, topicID: Types.ObjectId) =>
  spawn(
    parent,
    async (state = {}, msg, ctx) => {
      let nextState = state;

      switch (msg.type) {
        case CacheProtocolTypes.GET_TOPIC:
          // GET TOPIC
          dispatch(msg.sender, {
            type: CacheProtocolTypes.SUCCESS,
            payload: state,
            sender: ctx.self,
          });
          break;
        case CacheProtocolTypes.SET_TOPIC: {
          // SET TOPIC
          const topicDocument = await Topic.findById(msg.payload.topicID);
          const topic = topicDocument?.toObject();

          nextState = { ...topic };

          dispatch(msg.sender, {
            type: CacheProtocolTypes.SUCCESS,
            payload: topic,
            sender: ctx.self,
          });
          break;
        }
        case CacheProtocolTypes.UPDATE_TOPIC: {
          // UPDATE TOPIC
          nextState = {
            ...state,
            ...msg.payload,
          };
          dispatch(msg.sender, {
            type: CacheProtocolTypes.SUCCESS,
            payload: state,
          });
        }
      }

      return nextState;
    },
    topicID.toString()
  );

export { spawn_topics_service };
