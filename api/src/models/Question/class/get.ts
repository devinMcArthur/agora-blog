import { FilterQuery, QueryFindOptions, Types } from "mongoose";

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

const byIDDefaultOptions: GetByIDOptions = {
  throwError: false,
};
const byId = (
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

      resolve(questions);
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
      let pages: PageDocument[] = [];

      const questionPageConnections: QuestionPageConnectionDocument[] =
        await QuestionPageConnection.find({
          question: question._id,
        });

      for (const connection of questionPageConnections) {
        const page = await Page.getByID(connection.referrerPage!.toString());
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

export interface IStatementReferencesOptions {
  avoidPage?: Types.ObjectId | string;
  limit?: number;
  page?: number;
}

const statementReferences = (
  question: QuestionDocument,
  options?: IStatementReferencesOptions
): Promise<StatementDocument[]> => {
  return new Promise(async (resolve, reject) => {
    try {
      /**
       * Instantiate query
       */
      const query: FilterQuery<QuestionPageConnectionDocument> = {
        question: question._id,
      };

      if (options?.avoidPage) {
        query.referrerPage = { $ne: options.avoidPage };
      }

      /**
       * Instantiate query options
       */
      const queryOptions: QueryFindOptions = {};
      if (!!options?.limit) {
        queryOptions.limit = options.limit;

        if (options.page) queryOptions.skip = options.page * options.limit;
      }

      /**
       * Query
       */

      const questionPageConnections = await QuestionPageConnection.find(
        query,
        {},
        queryOptions
      );

      const statements: StatementDocument[] = [];

      for (let i = 0; i < questionPageConnections.length; i++) {
        const statement = await Statement.getById(
          questionPageConnections[i].statement!.toString(),
          {
            current: true,
          }
        );
        if (statement) statements.push(statement);
      }

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

const byQuestion = (Question: QuestionModel, question: string) => {
  return new Promise<QuestionDocument | null>(async (resolve, reject) => {
    try {
      const fetchedQuestion = await Question.findOne({
        question: { $regex: new RegExp(`^${question}`, "i") },
      });

      resolve(fetchedQuestion);
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  byId,
  list,
  pagesThatReference,
  referencedCount,
  statementReferences,
  search,
  byQuestion,
};
