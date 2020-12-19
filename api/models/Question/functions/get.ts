import AgoraTypes from "@devin_mcarthur/agora-types";
import { Types } from "mongoose";
import { QuestionDocument, QuestionModel } from ".";
import GetByIDOptions from "../../../typescript/interface/getByID_Options";
import populateOptions from "../../../utils/populateOptions";

export interface QuestionGetOptions extends GetByIDOptions {
  populate?: "none" | "normal";
}

type QuestionGetPopulatedReturn<
  opts extends QuestionGetOptions
> = opts["populate"] extends "normal"
  ? // Return populated document if options.populate === "normal"
    Promise<AgoraTypes.Question.Documents.QuestionPopulated>
  : Promise<QuestionDocument>;

type QuestionGetReturn<
  opts extends QuestionGetOptions
> = opts["throwError"] extends true
  ? // Returns normal document if options.populate === "none"
    QuestionGetPopulatedReturn<opts>
  : // Will either return the 3 document types or null if throwError=false
    QuestionGetPopulatedReturn<opts> | null;

export type QuestionGetByID = <opts extends QuestionGetOptions>(
  id: Types.ObjectId | string,
  options?: opts
) => QuestionGetReturn<opts>;
const byIDDefaultOptions: QuestionGetOptions = {
  throwError: false,
  populate: "none",
};
function byID(
  Question: QuestionModel,
  id: Types.ObjectId | string,
  options: QuestionGetOptions = byIDDefaultOptions
) {
  return new Promise(async (resolve, reject) => {
    try {
      options = populateOptions(options, byIDDefaultOptions);
      const question = await Question.findById(id);

      if (!question && options.throwError) {
        throw new Error("Question.getByID: Unable to find question");
      }

      if (options.populate === "normal") {
        // resolve(await question?.populateNormal());
      }

      resolve(question);
    } catch (e) {
      reject(e);
    }
  });
}

export type QuestionGetList = () => Promise<
  AgoraTypes.Question.Documents.QuestionPopulated[]
>;
function list(Question: QuestionModel) {
  return new Promise(async (resolve, reject) => {
    try {
      const questions = await Question.find({});

      let populatedQuestions: AgoraTypes.Question.Documents.QuestionPopulated[] = [];
      questions.forEach(async (question) => {
        populatedQuestions.push(await question.populateNormal());
      });

      populatedQuestions = populatedQuestions.sort(
        (a, b) => b.referencedCount - a.referencedCount
      );

      resolve(populatedQuestions);
    } catch (e) {
      reject(e);
    }
  });
}

export default {
  byID,
  list,
};
