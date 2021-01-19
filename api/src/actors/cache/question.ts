import { Types } from "mongoose";
import { dispatch, spawn, spawnStateless } from "nact";
import Question from "../../models/Question";

const spawn_questions_service = (cacheActor: any) =>
  spawnStateless(
    cacheActor,
    (msg, ctx) => {
      const questionID = msg.payload.questionID;

      let childActor: any;

      if (questionID) {
        if (ctx.children.has(questionID.toString())) {
          childActor = ctx.children.get(questionID.toString());
        } else {
          childActor = spawn_question_service(ctx.self, questionID);
        }
      }

      if (childActor) dispatch(childActor, msg);
    },
    "questions"
  );

export const CacheProtocolTypes = {
  GET_QUESTION: "GET_QUESTION",
  SET_QUESTION: "SET_QUESTION",
  UPDATE_QUESTION: "UPDATE_QUESTION",
  SUCCESS: "SUCCESS",
};

const spawn_question_service = (parent: any, questionID: Types.ObjectId) =>
  spawn(
    parent,
    async (state = {}, msg, ctx) => {
      let nextState = state;

      switch (msg.type) {
        case CacheProtocolTypes.GET_QUESTION:
          // GET QUESTION
          dispatch(msg.sender, {
            type: CacheProtocolTypes.SUCCESS,
            payload: state,
            sender: ctx.self,
          });
          break;
        case CacheProtocolTypes.SET_QUESTION: {
          // SET QUESTION
          const questionDocument = await Question.findById(
            msg.payload.questionID
          );
          const question = JSON.parse(JSON.stringify(questionDocument));

          const relatedPages = await questionDocument?.getPagesThatReference({
            fromCache: false,
          });
          const referencedCount = await questionDocument?.getReferencedCount({
            fromCache: false,
          });

          nextState = { ...question, relatedPages, referencedCount };

          dispatch(msg.sender, {
            type: CacheProtocolTypes.SUCCESS,
            payload: question,
            sender: ctx.self,
          });
          break;
        }
        case CacheProtocolTypes.UPDATE_QUESTION: {
          // UPDATE QUESTION
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
    questionID.toString()
  );

export { spawn_questions_service };
