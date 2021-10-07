import { Types } from "mongoose";
import { dispatch, spawn, spawnStateless } from "nact";

import { Page } from "@models";

import { cacheService } from "../../server";

const spawn_pages_service = (cacheActor: any) =>
  spawnStateless(
    cacheActor,
    (msg, ctx) => {
      const pageID = msg.payload.pageID;

      let childActor: any;

      if (pageID) {
        if (ctx.children.has(pageID.toString())) {
          childActor = ctx.children.get(pageID.toString());
        } else {
          childActor = spawn_page_service(ctx.self, pageID);
        }
      }

      if (childActor) dispatch(childActor, msg);
    },
    "pages"
  );

export const CacheProtocolTypes = {
  GET_PAGE: "GET_PAGE",
  SET_PAGE: "SET_PAGE",
  UPDATE_PAGE: "UPDATE_PAGE",
  SUCCESS: "SUCCESS",
};

const spawn_page_service = (parent: any, pageID: Types.ObjectId) =>
  spawn(
    parent,
    async (state = {}, msg, ctx) => {
      let stateUpdated = false;
      let nextState = state;

      switch (msg.type) {
        case CacheProtocolTypes.GET_PAGE:
          // GET PAGE
          dispatch(msg.sender, {
            type: CacheProtocolTypes.SUCCESS,
            payload: state,
            sender: ctx.self,
          });

          break;
        case CacheProtocolTypes.SET_PAGE: {
          // SET PAGE
          const pageDocument = await Page.findById(msg.payload.pageID);
          const page = JSON.parse(JSON.stringify(pageDocument));

          const relatedPages = await pageDocument?.getPagesThatReference({
            fromCache: false,
          });

          const referencedCount = await pageDocument?.getReferencedCount({
            fromCache: false,
          });

          nextState = { ...page, relatedPages, referencedCount };

          dispatch(msg.sender, {
            type: CacheProtocolTypes.SUCCESS,
            payload: nextState,
            sender: ctx.self,
          });
          stateUpdated = true;
          return nextState;
        }
        case CacheProtocolTypes.UPDATE_PAGE: {
          // UPDATE PAGE
          nextState = {
            ...state,
            ...msg.payload,
          };
          dispatch(msg.sender, {
            type: CacheProtocolTypes.SUCCESS,
            payload: state,
          });
          stateUpdated = true;
          break;
        }
      }

      if (stateUpdated) {
        // Update Slug-ID Cache
        dispatch(cacheService, {
          path: ["page_slugs"],
          type: "ADD_ID",
          payload: { slug: msg.payload.slug, id: msg.payload._id },
        });
      }

      return nextState;
    },
    pageID.toString()
  );

export { spawn_pages_service };
