import { Types } from "mongoose";

import { Question } from "@models";
import { ListOptionData } from "@typescript/graphql";

const question = async (id: Types.ObjectId) => {
  return await Question.getById(id);
};

const questions = async (options?: ListOptionData) => {
  return await Question.getList(options);
};

const searchQuestions = async (searchString: string, limit?: number) => {
  return Question.search(searchString, limit);
};

export default {
  question,
  questions,
  searchQuestions,
};
