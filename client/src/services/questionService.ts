import { Types } from "mongoose";

import { QuestionPopulated } from "../typescript/interfaces/documents/Question";
import APIService from "./apiService";

export default function QuestionService() {
  // Mocks an API call
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
    getQuestionByID,
  };
}
