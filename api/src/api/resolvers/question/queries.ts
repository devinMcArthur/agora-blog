import { Types } from "mongoose";

import { Question } from "@models";

const question = async (id: Types.ObjectId) => {
  return await Question.getByID(id, { fromCache: true });
};

const questions = async () => {
  return await Question.getList({ fromCache: true });
};

const searchQuestions = async (searchString: string) => {
  return Question.search(searchString);
};

export default {
  question,
  questions,
  searchQuestions,
};
