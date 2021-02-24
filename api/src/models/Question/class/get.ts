import { Types } from "mongoose";
import { dispatch } from "nact";

import Page, { PageDocument } from "../../Page";
import { QuestionDocument, QuestionModel } from "..";
import GetByIDOptions from "../../../typescript/interface/getByID_Options";
import populateOptions from "../../../utils/populateOptions";
import QuestionPageConnection, {
  QuestionPageConnectionDocument,
} from "../../QuestionPageConnection";
import { StatementDocument } from "../../Statement";
import isEmpty from "../../../validation/isEmpty";
import performCacheQuery from "../../../utils/performCacheQuery";
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
      const statements = await question.model("StatementClass").find({
        questions: question._id,
      });

      resolve(statements);
    } catch (e) {
      reject(e);
    }
  });
};

const pageConnectionsDefaultOptions = {
  fromCache: false,
}
const pageConnections = (
  question: QuestionDocument,
  options = pageConnectionsDefaultOptions
) => {
  return new Promise<QuestionPageConnectionDocument[]>(async (resolve, reject) => {
    try {
      options = populateOptions(options, pageConnectionsDefaultOptions)

      let questionPageConnections: QuestionPageConnectionDocument[] = [];
      if (options.fromCache) {
        const cachedQuestion = await performCacheQuery({
          path: ["questions"],
          type: "GET_QUESTION",
          payload: {questionID: question._id}
        });
        if (cachedQuestion.pageConnections) {
          for (let i = 0; i < cachedQuestion.pageConnections.length; i++) {
            questionPageConnections[i] = new QuestionPageConnection(cachedQuestion.pageConnections[i]);
          }
        } else {
          dispatch(cacheService, {
            path: ["questions"],
            type: "SET_QUESTION",
            payload: {questionID: question._id}
          })
        }
      }

      if (questionPageConnections.length === 0) {
        questionPageConnections = await QuestionPageConnection.find(
          {
            question: question._id,
          }
        );
      }


      resolve(questionPageConnections);
    } catch (e) {
      reject(e);
    }
  })
  
}

export default {
  byID,
  list,
  referencedCount,
  statementReferences,
  pageConnections
};
