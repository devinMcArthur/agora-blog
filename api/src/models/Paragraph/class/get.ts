import { Types } from "mongoose";
import { dispatch } from "nact";
import { StatementDocument } from "../../../models/Statement";
import { cacheService } from "../../../server";
import performCacheQuery from "../../../utils/performCacheQuery";
import isEmpty from "../../../validation/isEmpty";
import { ParagraphDocument, ParagraphModel } from "..";
import GetByIDOptions from "../../../typescript/interface/getByID_Options";
import populateOptions from "../../../utils/populateOptions";

import Statement from "../../Statement";

const byIDDefaultOptions: GetByIDOptions = {
  throwError: false,
  fromCache: false,
};
const byID = (
  Paragraph: ParagraphModel,
  id: Types.ObjectId | string,
  options: GetByIDOptions = byIDDefaultOptions
): Promise<ParagraphDocument | null> => {
  return new Promise(async (resolve, reject) => {
    try {
      options = populateOptions(options, byIDDefaultOptions);

      let paragraph: ParagraphDocument | null = null;
      if (options.fromCache) {
        const cachedParagraph = await performCacheQuery({
          path: ["paragraphs"],
          type: "GET_PARAGRAPH",
          payload: { paragraphID: id },
        });
        if (!isEmpty(cachedParagraph)) {
          paragraph = new Paragraph(cachedParagraph);
        } else {
          dispatch(cacheService, {
            path: ["paragraphs"],
            type: "SET_PARAGRAPH",
            payload: { paragraphID: id },
          });
        }
      }

      if (!paragraph) paragraph = await Paragraph.findById(id);

      if (!paragraph && options.throwError) {
        throw new Error("Paragraph.getByID: Unable to find paragraph");
      }

      resolve(paragraph);
    } catch (e) {
      reject(e);
    }
  });
};

const statementsDefaultOptions = {
  fromCache: false,
};
const statements = (
  paragraph: ParagraphDocument,
  options = byIDDefaultOptions
): Promise<StatementDocument[]> => {
  return new Promise(async (resolve, reject) => {
    try {
      options = populateOptions(options, statementsDefaultOptions);

      if (options.fromCache) {
        // Retrieve from cache
        const statements: StatementDocument[] = [];
        for (let i in paragraph.statements) {
          const statement = await Statement.getByID(
            paragraph.statements[i]!.toString(),
            { fromCache: true }
          );
          if (statement) statements[i] = statement;
        }

        resolve(statements);
      } else {
        // Retrieve directly from DB
        const statements: StatementDocument[] = await Statement.find({
          _id: {
            $in: paragraph.statements.map((id) => id!.toString()),
          },
        });

        resolve(statements);
      }
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  byID,
  statements,
};
