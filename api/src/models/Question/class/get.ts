import { Types } from "mongoose";
import { dispatch } from "nact";

import {
  Page,
  PageDocument,
  QuestionDocument,
  QuestionModel,
  QuestionPageConnection,
  QuestionPageConnectionDocument,
  Statement,
  StatementDocument,
} from "@models";
import GetByIDOptions from "@typescript/interface/getByID_Options";
import populateOptions from "@utils/populateOptions";
import isEmpty from "@validation/isEmpty";
import performCacheQuery from "@utils/performCacheQuery";

import { cacheService } from "../../../server";

const byIDDefaultOptions: GetByIDOptions = {
  throwError: false,
  fromCache: false,
};
const byID = (
  Question: QuestionModel,
  id: Types.ObjectId | string,
  options: GetByIDOptions = byIDDefaultOptions
): Promise<QuestionDocument | null> => {
  return new Promise(async (resolve, reject) => {
    try {
      options = populateOptions(options, byIDDefaultOptions);

      let question: QuestionDocument | null = null;
      if (options.fromCache) {
        const cachedQuestion = await performCacheQuery({
          path: ["questions"],
          type: "GET_QUESTION",
          payload: { questionID: id },
        });
        if (!isEmpty(cachedQuestion)) {
          question = new Question(cachedQuestion);
        } else {
          dispatch(cacheService, {
            path: ["questions"],
            type: "SET_QUESTION",
            payload: { questionID: id },
          });
        }
      }

      if (!question) question = await Question.findById(id);

      if (!question && options.throwError) {
        throw new Error("Question.getByID: Unable to find question");
      }

      resolve(question);
    } catch (e) {
      reject(e);
    }
  });
};

const listDefaultOptions = {
  fromCache: false,
};
const list = (
  Question: QuestionModel,
  options = listDefaultOptions
): Promise<QuestionDocument[]> => {
  return new Promise(async (resolve, reject) => {
    try {
      options = populateOptions(options, listDefaultOptions);

      let questions: QuestionDocument[] = [];
      if (options.fromCache) {
        const cachedQuestionIDs = await performCacheQuery({
          path: ["question_list"],
          type: "GET_LIST",
        });
        if (cachedQuestionIDs.length > 0) {
          for (let i = 0; i < cachedQuestionIDs.length; i++) {
            const question = await Question.getByID(cachedQuestionIDs[i], {
              fromCache: true,
            });
            if (question) questions[i] = question;
          }
        } else {
          dispatch(cacheService, {
            path: ["question_list"],
            type: "SET_LIST",
          });
        }
      }

      if (questions.length === 0) {
        questions = await Question.find({});
      }

      resolve(questions);
    } catch (e) {
      reject(e);
    }
  });
};

const pagesThatReferenceDefaultOptions = {
  fromCache: false,
};
const pagesThatReference = (
  question: QuestionDocument,
  options = pagesThatReferenceDefaultOptions
): Promise<PageDocument[]> => {
  return new Promise(async (resolve, reject) => {
    try {
      options = populateOptions(options, pagesThatReferenceDefaultOptions);

      let pages: PageDocument[] = [];
      if (options.fromCache) {
        const cachedQuestion = await performCacheQuery({
          path: ["questions"],
          type: "GET_QUESTION",
          payload: { questionID: question._id },
        });
        if (cachedQuestion.relatedPages) {
          for (let i = 0; i < cachedQuestion.relatedPages.length; i++) {
            pages[i] = new Page(cachedQuestion.relatedPages[i]);
          }
        } else {
          dispatch(cacheService, {
            path: ["questions"],
            type: "SET_QUESTION",
            payload: { questionID: question._id },
          });
        }
      }

      if (pages.length === 0) {
        const questionPageConnections: QuestionPageConnectionDocument[] =
          await QuestionPageConnection.find({
            question: question._id,
          });

        for (const connection of questionPageConnections) {
          const page = await Page.getByID(connection.referrerPage!.toString(), {
            fromCache: true,
          });
          if (page) pages.push(page);
        }
      }

      resolve(pages);
    } catch (e) {
      reject(e);
    }
  });
};

const referencedCountDefaultOptions = {
  fromCache: false,
};
const referencedCount = (
  question: QuestionDocument,
  options = referencedCountDefaultOptions
): Promise<number> => {
  return new Promise(async (resolve, reject) => {
    try {
      options = populateOptions(options, referencedCountDefaultOptions);

      let count: number = 0;
      if (options.fromCache) {
        const cachedQuestion = await performCacheQuery({
          path: ["questions"],
          type: "GET_QUESTION",
          payload: { questionID: question._id },
        });
        if (cachedQuestion.referencedCount) {
          count = cachedQuestion.referencedCount;
        } else {
          dispatch(cacheService, {
            path: ["questions"],
            type: "SET_QUESTION",
            payload: { questionID: question._id },
          });
        }
      }

      if (count === 0) {
        count = await QuestionPageConnection.find({
          question: question._id,
        }).countDocuments();
      }

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
      const statements = await Statement.find({
        questions: question._id,
      });

      resolve(statements);
    } catch (e) {
      reject(e);
    }
  });
};

const search = (Question: QuestionModel, searchString: string) => {
  return new Promise<QuestionDocument[]>(async (resolve, reject) => {
    try {
      /**
       * Partial Search
       */
      const partialSearch = async () => {
        const escapeRegex = (text: string) => {
          return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
        };

        return Question.find({
          question: new RegExp(escapeRegex(searchString), "gi"),
        });
      };

      /**
       * Full Search
       */
      const fullSearch = async () => {
        return Question.find({
          $text: { $search: searchString, $caseSensitive: false },
        });
      };

      /**
       * Final Combination
       */

      let questions: QuestionDocument[] = await fullSearch();
      if (questions.length < 1) {
        questions = await partialSearch();
      }

      resolve(questions);
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
  search,
};
