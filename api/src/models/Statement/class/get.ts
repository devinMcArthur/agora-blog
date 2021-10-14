import { FilterQuery, Types } from "mongoose";
import { dispatch } from "nact";

import GetByIDOptions from "@typescript/interface/getByID_Options";
import populateOptions from "@utils/populateOptions";
import performCacheQuery from "@utils/performCacheQuery";
import isEmpty from "@validation/isEmpty";
import { StatementDocument, StatementModel } from "@models";

import { cacheService } from "../../../server";

export interface IStatementByIdOptions extends GetByIDOptions {
  current?: boolean;
}
const byIDDefaultOptions: IStatementByIdOptions = {
  throwError: false,
  fromCache: false,
  current: false,
};
const byID = (
  Statement: StatementModel,
  id: Types.ObjectId | string,
  options: IStatementByIdOptions = byIDDefaultOptions
): Promise<StatementDocument | null> => {
  return new Promise(async (resolve, reject) => {
    try {
      options = populateOptions(options, byIDDefaultOptions);

      let statement: StatementDocument | null = null;
      if (options.fromCache) {
        const cachedStatement = await performCacheQuery({
          path: ["statements"],
          type: "GET_STATEMENT",
          payload: { statementID: id },
        });
        if (!isEmpty(cachedStatement)) {
          statement = new Statement(cachedStatement);
        } else {
          dispatch(cacheService, {
            path: ["statements"],
            type: "SET_STATEMENT",
            payload: { statementID: id },
          });
        }
      }

      const query: FilterQuery<StatementDocument> = { _id: id };
      if (options.current) {
        query.current = true;
      }

      if (!statement) statement = await Statement.findOne(query);

      if (!statement && options.throwError) {
        throw new Error("Statement.getByID: Unable to find statement");
      }

      resolve(statement);
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  byID,
};
