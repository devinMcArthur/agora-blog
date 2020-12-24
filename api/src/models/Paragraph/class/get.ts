import { Types } from "mongoose";
import { StatementDocument } from "src/models/Statement";
import { ParagraphDocument, ParagraphModel } from "..";
import GetByIDOptions from "../../../typescript/interface/getByID_Options";
import populateOptions from "../../../utils/populateOptions";

import Statement from "../../Statement";

const byIDDefaultOptions: GetByIDOptions = {
  throwError: false,
};
const byID = (
  Paragraph: ParagraphModel,
  id: Types.ObjectId | string,
  options: GetByIDOptions = byIDDefaultOptions
): Promise<ParagraphDocument | null> => {
  return new Promise(async (resolve, reject) => {
    try {
      options = populateOptions(options, byIDDefaultOptions);
      const paragraph = await Paragraph.findById(id);

      if (!paragraph && options.throwError) {
        throw new Error("Paragraph.getByID: Unable to find paragraph");
      }

      resolve(paragraph);
    } catch (e) {
      reject(e);
    }
  });
};

const statements = (
  paragraph: ParagraphDocument
): Promise<StatementDocument[]> => {
  return new Promise(async (resolve, reject) => {
    try {
      const statements: StatementDocument[] = await Statement.find({
        _id: {
          $in: paragraph.statements.map((id) => id!.toString()),
        },
      });

      resolve(statements);
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  byID,
  statements,
};
