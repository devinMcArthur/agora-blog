import { Types } from "mongoose";

import { QuestionPopulated } from "../typescript/interfaces/documents/Question";
import APIService from "./apiService";

export default function QuestionService() {
  // Get root question
  const getRootQuestions = () => {
    return new Promise<QuestionPopulated[]>((resolve, reject) => {
      APIService()
        .apiCall({
          endpoint: "/questionRoot",
        })
        .then((res) => resolve(res.data.questions))
        .catch((err) => reject(err));
    });
  };

  // Get question populated by ID
  const getQuestionByID = (questionID: Types.ObjectId) => {
    return new Promise<QuestionPopulated>((resolve, reject) => {
      APIService()
        .apiCall({
          endpoint: "/questionByID",
          options: { params: { questionID } },
        })
        .then((res) => resolve(res.data.question))
        .catch((err) => reject(err));
    });
  };

  return {
    getRootQuestions,
    getQuestionByID,
  };
}
