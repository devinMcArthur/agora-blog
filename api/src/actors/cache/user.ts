import { Types } from "mongoose";
import { dispatch, spawn, spawnStateless } from "nact";
import User from "../../models/User";

const spawn_users_service = (cacheActor: any) =>
  spawnStateless(
    cacheActor,
    (msg, ctx) => {
      const userID = msg.payload.userID;

      let childActor: any;

      if (userID) {
        if (ctx.children.has(userID.toString())) {
          childActor = ctx.children.get(userID.toString());
        } else {
          childActor = spawn_user_service(ctx.self, userID);
        }
      }

      if (childActor) dispatch(childActor, msg);
    },
    "users"
  );

export const CacheProtocolTypes = {
  GET_USER: "GET_USER",
  SET_USER: "SET_USER",
  UPDATE_USER: "UPDATE_USER",
  SUCCESS: "SUCCESS",
};

const spawn_user_service = (parent: any, userID: Types.ObjectId) =>
  spawn(
    parent,
    async (state = {}, msg, ctx) => {
      let nextState = state;

      switch (msg.type) {
        case CacheProtocolTypes.GET_USER:
          // GET USER
          dispatch(msg.sender, {
            type: CacheProtocolTypes.SUCCESS,
            payload: state,
            sender: ctx.self,
          });
          break;
        case CacheProtocolTypes.SET_USER: {
          // SET USER
          const userDocument = await User.findById(msg.payload.userID);
          const user = JSON.parse(JSON.stringify(userDocument));

          nextState = { ...user };

          dispatch(msg.sender, {
            type: CacheProtocolTypes.SUCCESS,
            payload: user,
            sender: ctx.self,
          });
          break;
        }
        case CacheProtocolTypes.UPDATE_USER: {
          // UPDATE USER
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
    userID.toString()
  );

export { spawn_users_service };
