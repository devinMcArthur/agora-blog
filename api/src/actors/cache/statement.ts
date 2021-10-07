import { Types } from "mongoose";
import { dispatch, spawn, spawnStateless } from "nact";

import { Statement } from "@models";

const spawn_statements_service = (cacheActor: any) =>
  spawnStateless(
    cacheActor,
    (msg, ctx) => {
      const statementID = msg.payload.statementID;

      let childActor: any;

      if (statementID) {
        if (ctx.children.has(statementID.toString())) {
          childActor = ctx.children.get(statementID.toString());
        } else {
          childActor = spawn_statement_service(ctx.self, statementID);
        }
      }

      if (childActor) dispatch(childActor, msg);
    },
    "statements"
  );

export const CacheProtocolTypes = {
  GET_STATEMENT: "GET_STATEMENT",
  SET_STATEMENT: "SET_STATEMENT",
  UPDATE_STATEMENT: "UPDATE_STATEMENT",
  SUCCESS: "SUCCESS",
};

const spawn_statement_service = (parent: any, statementID: Types.ObjectId) =>
  spawn(
    parent,
    async (state = {}, msg, ctx) => {
      let nextState = state;

      switch (msg.type) {
        case CacheProtocolTypes.GET_STATEMENT:
          // GET STATEMENT
          dispatch(msg.sender, {
            type: CacheProtocolTypes.SUCCESS,
            payload: state,
            sender: ctx.self,
          });
          break;
        case CacheProtocolTypes.SET_STATEMENT: {
          // SET STATEMENT
          const statement = (
            await Statement.findById(msg.payload.statementID)
          )?.toObject();

          nextState = { ...statement };

          dispatch(msg.sender, {
            type: CacheProtocolTypes.SUCCESS,
            payload: statement,
            sender: ctx.self,
          });
          break;
        }
        case CacheProtocolTypes.UPDATE_STATEMENT: {
          // UPDATE STATEMENT
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
    statementID.toString()
  );

export { spawn_statements_service };
