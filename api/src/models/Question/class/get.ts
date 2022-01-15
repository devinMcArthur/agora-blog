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
import GetByIDOptions from "@typescript/interface/getById_Options";
import populateOptions from "@utils/populateOptions";
import { IListOptions } from "@typescript/interface/list_Options";
import ElasticsearchClient from "@elasticsearch/client";

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
        throw new Error("Question.getById: Unable to find question");
      }

      resolve(question);
    } catch (e) {
      reject(e);
    }
  });
};

const bySlugDefaultOptions: GetByIDOptions = {
  throwError: false,
};
const bySlug = (
  Question: QuestionModel,
  slug: string,
  options: GetByIDOptions = bySlugDefaultOptions
): Promise<QuestionDocument | null> => {
  return new Promise(async (resolve, reject) => {
    try {
      options = populateOptions(options, bySlugDefaultOptions);

      const question = await Question.findOne({ slug });

      if (!question && options.throwError) {
        throw new Error("Question.getBySlug: Unable to find question");
      }

      resolve(question);
    } catch (e) {
      reject(e);
    }
  });
};

const listDefaultOptions: IListOptions<QuestionDocument> = {
  pageLimit: 9,
  offset: 0,
};
const list = (
  Question: QuestionModel,
  options?: IListOptions<QuestionDocument>
): Promise<QuestionDocument[]> => {
  return new Promise(async (resolve, reject) => {
    try {
      options = populateOptions(options, listDefaultOptions);

      const questions = await Question.find(options?.query || {}, undefined, {
        sort: {
          referencedCount: -1,
          createdAt: -1,
          question: -1,
        },
        limit: options?.pageLimit,
        skip: options?.offset,
      });

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
        const page = await Page.getById(connection.referrerPage!.toString());
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

const search = (
  Question: QuestionModel,
  searchString: string,
  limit?: number
) => {
  return new Promise<QuestionDocument[]>(async (resolve, reject) => {
    try {
      const res = await ElasticsearchClient.search({
        index: "question",
        body: {
          query: {
            match: {
              "question.question": {
                query: searchString.toLowerCase(),
                fuzziness: "AUTO",
              },
            },
          },
        },
        size: limit,
      });

      const questionIds: string[] = res.body.hits.hits.map(
        (item: any) => item._id
      );

      const questions: QuestionDocument[] = [];
      for (let i = 0; i < questionIds.length; i++) {
        const question = await Question.getById(questionIds[i]);
        if (question) questions.push(question);
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
  bySlug,
  list,
  pagesThatReference,
  referencedCount,
  statementReferences,
  search,
  byQuestion,
};
