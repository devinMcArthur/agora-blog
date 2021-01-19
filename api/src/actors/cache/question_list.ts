import { dispatch, spawn } from "nact";
import Question from "../../models/Question";

export const ProtocolTypes = {
  GET_LIST: "GET_LIST",
  SET_LIST: "SET_LIST",
  SUCCESS: "SUCCESS",
};

const spawn_question_list_service = (cacheActor: any) =>
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
          const questions = await Question.getList();
          nextState = questions.map((question) => question._id);
        }
      }
      return nextState;
    },
    "question_list"
  );

export { spawn_question_list_service };
