import { Types } from "mongoose";
import Page, { PageDocument } from "../../Page";
import { QuestionDocument, QuestionModel } from "..";
import GetByIDOptions from "../../../typescript/interface/getByID_Options";
import populateOptions from "../../../utils/populateOptions";
import QuestionPageConnection, {
  QuestionPageConnectionDocument,
} from "../../QuestionPageConnection";
import { StatementDocument } from "../../Statement";

const byIDDefaultOptions: GetByIDOptions = {
  throwError: false,
};
const byID = (
  Question: QuestionModel,
  id: Types.ObjectId | string,
  options: GetByIDOptions = byIDDefaultOptions
): Promise<QuestionDocument | null> => {
  return new Promise(async (resolve, reject) => {
    try {
      options = populateOptions(options, byIDDefaultOptions);
      const question = await Question.findById(id);

      if (!question && options.throwError) {
        throw new Error("Question.getByID: Unable to find question");
      }

      resolve(question);
    } catch (e) {
      reject(e);
    }
  });
};

const list = (Question: QuestionModel): Promise<QuestionDocument[]> => {
  return new Promise(async (resolve, reject) => {
    try {
      const questions = await Question.find({});

      let index = [];
      for (const question of questions) {
        index.push({
          _id: question._id,
          referencedCount: await question.getReferencedCount(),
        });
      }
      index = index.sort((a, b) => b.referencedCount - a.referencedCount);

      const sortedQuestions = [];
      for (const i of index) {
        sortedQuestions.push(
          questions.find(
            (question) => question._id.toString() === i._id.toString()
          )!
        );
      }

      resolve(sortedQuestions);
    } catch (e) {
      reject(e);
    }
  });
};

const pagesThatReference = (
  question: QuestionDocument
): Promise<PageDocument[]> => {
  return new Promise(async (resolve, reject) => {
    try {
      const questionPageConnections: QuestionPageConnectionDocument[] = await QuestionPageConnection.find(
        {
          question: question._id,
        }
      );

      const pages: PageDocument[] = [];

      for (const connection of questionPageConnections) {
        const page = await Page.findById(connection.referrerPage);
        if (page) pages.push(page);
      }

      resolve(pages);
    } catch (e) {
      reject(e);
    }
  });
};

const referencedCount = (question: QuestionDocument): Promise<number> => {
  return new Promise(async (resolve, reject) => {
    try {
      const count = await QuestionPageConnection.find({
        question: question._id,
      }).countDocuments();

      resolve(count);
    } catch (e) {
      reject(e);
    }
  });
};

const statementReferences = (
  question: QuestionDocument
): Promise<StatementDocument[]> => {
  return new Promise(async (resolve, reject) => {
    try {
      const statements = await question.model("StatementClass").find({
        questions: question._id,
      });

      resolve(statements);
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  byID,
  list,
  pagesThatReference,
  referencedCount,
  statementReferences,
};
