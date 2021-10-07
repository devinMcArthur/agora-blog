import { Types } from "mongoose";
import { dispatch, spawn, spawnStateless } from "nact";

import { Variable } from "@models";

const spawn_variables_service = (cacheActor: any) =>
  spawnStateless(
    cacheActor,
    (msg, ctx) => {
      const variableID = msg.payload.variableID;

      let childActor: any;

      if (variableID) {
        if (ctx.children.has(variableID.toString())) {
          childActor = ctx.children.get(variableID.toString());
        } else {
          childActor = spawn_variable_service(ctx.self, variableID);
        }
      }

      if (childActor) dispatch(childActor, msg);
    },
    "variables"
  );

export const CacheProtocolTypes = {
  GET_VARIABLE: "GET_VARIABLE",
  SET_VARIABLE: "SET_VARIABLE",
  UPDATE_VARIABLE: "UPDATE_VARIABLE",
  SUCCESS: "SUCCESS",
};

const spawn_variable_service = (parent: any, variableID: Types.ObjectId) =>
  spawn(
    parent,
    async (state = {}, msg, ctx) => {
      let nextState = state;

      switch (msg.type) {
        case CacheProtocolTypes.GET_VARIABLE:
          // GET VARIABLE
          dispatch(msg.sender, {
            type: CacheProtocolTypes.SUCCESS,
            payload: state,
            sender: ctx.self,
          });
          break;
        case CacheProtocolTypes.SET_VARIABLE: {
          // SET VARIABLE
          const variableDocument = await Variable.findById(
            msg.payload.variableID
          );
          const variable = variableDocument?.toObject();

          const relatedPages = await variableDocument?.getPagesThatReference({
            fromCache: false,
          });

          const finalValue = await variableDocument?.getFinalValue();

          nextState = { ...variable, relatedPages, finalValue };

          dispatch(msg.sender, {
            type: CacheProtocolTypes.SUCCESS,
            payload: variable,
            sender: ctx.self,
          });
          break;
        }
        case CacheProtocolTypes.UPDATE_VARIABLE: {
          // UPDATE VARIABLE
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
    variableID.toString()
  );

export { spawn_variables_service };
