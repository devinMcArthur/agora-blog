import { Types } from "mongoose";
import { dispatch, spawn, spawnStateless } from "nact";

import { Paragraph } from "@models";

const spawn_paragraphs_service = (cacheActor: any) =>
  spawnStateless(
    cacheActor,
    (msg, ctx) => {
      const paragraphID = msg.payload.paragraphID;

      let childActor: any;

      if (paragraphID) {
        if (ctx.children.has(paragraphID.toString())) {
          childActor = ctx.children.get(paragraphID.toString());
        } else {
          childActor = spawn_paragraph_service(ctx.self, paragraphID);
        }
      }

      if (childActor) dispatch(childActor, msg);
    },
    "paragraphs"
  );

export const CacheProtocolTypes = {
  GET_PARAGRAPH: "GET_PARAGRAPH",
  SET_PARAGRAPH: "SET_PARAGRAPH",
  UPDATE_PARAGRAPH: "UPDATE_PARAGRAPH",
  SUCCESS: "SUCCESS",
};

const spawn_paragraph_service = (parent: any, paragraphID: Types.ObjectId) =>
  spawn(
    parent,
    async (state = {}, msg, ctx) => {
      let nextState = state;

      switch (msg.type) {
        case CacheProtocolTypes.GET_PARAGRAPH:
          // GET PARAGRAPH
          dispatch(msg.sender, {
            type: CacheProtocolTypes.SUCCESS,
            payload: state,
            sender: ctx.self,
          });
          break;
        case CacheProtocolTypes.SET_PARAGRAPH: {
          // SET PARAGRAPH
          const paragraph = (
            await Paragraph.findById(msg.payload.paragraphID)
          )?.toObject();

          nextState = { ...paragraph };

          dispatch(msg.sender, {
            type: CacheProtocolTypes.SUCCESS,
            payload: paragraph,
            sender: ctx.self,
          });
          break;
        }
        case CacheProtocolTypes.UPDATE_PARAGRAPH: {
          // UPDATE PARAGRAPH
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
    paragraphID.toString()
  );

export { spawn_paragraphs_service };
