import { dispatch, spawn } from "nact";

export const PageSlugProtocolTypes = {
  GET_ID: "GET_ID",
  ADD_ID: "ADD_ID",
  NOT_FOUND: "NOT_FOUND",
};

const spawn_page_slug_service = (cacheActor: any) =>
  spawn(
    cacheActor,
    async (state = {}, msg, ctx) => {
      let id = state[msg.payload.slug];
      switch (msg.type) {
        case PageSlugProtocolTypes.GET_ID: {
          if (id) {
            dispatch(msg.sender, { payload: id, type: "SUCCESS" });
          } else {
            // No id found
            dispatch(msg.sender, { type: "NOT_FOUND", slug: msg.payload.slug });
          }
          break;
        }
        case PageSlugProtocolTypes.ADD_ID: {
          if (id) break;
          const newState = {
            ...state,
            [msg.payload.slug]: msg.payload.id,
          };
          return newState;
        }
      }
      return state;
    },
    "page_slugs"
  );

export { spawn_page_slug_service };
