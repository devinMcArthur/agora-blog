import { Types } from "mongoose";
import { dispatch } from "nact";

import GetByIDOptions from "../../../typescript/interface/getByID_Options";
import populateOptions from "../../../utils/populateOptions";

import { StatementDocument, StatementModel } from "..";
import performCacheQuery from "../../../utils/performCacheQuery";
import { cacheService } from "../../../server";
import isEmpty from "../../../validation/isEmpty";

const byIDDefaultOptions: GetByIDOptions = {
  throwError: false,
  fromCache: false,
};
const byID = (
  Statement: StatementModel,
  id: Types.ObjectId | string,
  options: GetByIDOptions = byIDDefaultOptions
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

      if (!statement) statement = await Statement.findById(id);

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
