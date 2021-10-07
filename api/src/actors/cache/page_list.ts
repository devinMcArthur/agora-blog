import { dispatch, spawn } from "nact";

import { Page } from "@models";

export const ProtocolTypes = {
  GET_LIST: "GET_LIST",
  SET_LIST: "SET_LIST",
  SUCCESS: "SUCCESS",
};

const spawn_page_list_service = (cacheActor: any) =>
  spawn(
    cacheActor,
    async (state = [], msg, ctx) => {
      let nextState = state;
      switch (msg.type) {
        case ProtocolTypes.GET_LIST: {
          dispatch(msg.sender, {
            type: ProtocolTypes.SUCCESS,
            payload: state,
            sender: ctx.self,
          });

          break;
        }
        case ProtocolTypes.SET_LIST: {
          const pages = await Page.getList();
          nextState = pages.map((page) => page._id);
        }
      }
      return nextState;
    },
    "page_list"
  );

export { spawn_page_list_service };
