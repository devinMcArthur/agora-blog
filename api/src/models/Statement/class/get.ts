import { FilterQuery, Types } from "mongoose";

import GetByIDOptions from "@typescript/interface/getById_Options";
import populateOptions from "@utils/populateOptions";
import { StatementDocument, StatementModel } from "@models";

export interface IStatementByIdOptions extends GetByIDOptions {
  current?: boolean;
}
const byIDDefaultOptions: IStatementByIdOptions = {
  throwError: false,
  current: false,
};
const byId = (
  Statement: StatementModel,
  id: Types.ObjectId | string,
  options: IStatementByIdOptions = byIDDefaultOptions
): Promise<StatementDocument | null> => {
  return new Promise(async (resolve, reject) => {
    try {
      options = populateOptions(options, byIDDefaultOptions);

      const query: FilterQuery<StatementDocument> = { _id: id };
      if (options.current) {
        query.current = true;
      }

      const statement = await Statement.findOne(query);

      if (!statement && options.throwError) {
        throw new Error("Statement.getById: Unable to find statement");
      }

      resolve(statement);
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  byId,
};
