import { Types } from "mongoose";

import { Question } from "@models";

const question = async (id: Types.ObjectId) => {
  return await Question.getById(id);
};

const questions = async () => {
  return await Question.getList();
};

const searchQuestions = async (searchString: string, limit?: number) => {
  return Question.search(searchString, limit);
};

export default {
  question,
  questions,
  searchQuestions,
};
