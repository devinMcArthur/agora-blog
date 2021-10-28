import { Types } from "mongoose";

import { Question } from "@models";

const question = async (id: Types.ObjectId) => {
  return await Question.getById(id);
};

const questions = async () => {
  return await Question.getList();
};

const searchQuestions = async (searchString: string) => {
  return Question.search(searchString);
};

export default {
  question,
  questions,
  searchQuestions,
};
