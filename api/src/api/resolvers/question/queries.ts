import { Types } from "mongoose";
import Question from "../../../models/Question";

const question = async (id: Types.ObjectId) => {
  return await Question.getByID(id, { fromCache: true });
};

const questions = async () => {
  return await Question.getList({ fromCache: true });
};

export default {
  question,
  questions,
};
