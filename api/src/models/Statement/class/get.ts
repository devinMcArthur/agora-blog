import { Types } from "mongoose";
import GetByIDOptions from "../../../typescript/interface/getByID_Options";
import populateOptions from "../../../utils/populateOptions";

import { StatementDocument, StatementModel } from "..";

const byIDDefaultOptions: GetByIDOptions = {
  throwError: false,
};
const byID = (
  Statement: StatementModel,
  id: Types.ObjectId | string,
  options: GetByIDOptions = byIDDefaultOptions
): Promise<StatementDocument | null> => {
  return new Promise(async (resolve, reject) => {
    try {
      options = populateOptions(options, byIDDefaultOptions);
      const statement = await Statement.findById(id);

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
