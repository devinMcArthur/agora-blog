import AgoraTypes from "@devin_mcarthur/agora-types";
import { Types } from "mongoose";
import { ParagraphDocument, ParagraphModel } from ".";
import GetByIDOptions from "../../../typescript/interface/getByID_Options";
import populateOptions from "../../../utils/populateOptions";

export interface ParagraphGetOptions extends GetByIDOptions {
  populate?: "none" | "normal";
}

type ParagraphGetPopulatedReturn<
  opts extends ParagraphGetOptions
> = opts["populate"] extends "normal"
  ? // Return populated document if options.populate === "normal"
    Promise<AgoraTypes.Paragraph.Documents.ParagraphPopulated>
  : Promise<ParagraphDocument>;

type ParagraphGetReturn<
  opts extends ParagraphGetOptions
> = opts["throwError"] extends true
  ? // Returns normal document if options.populate === "none"
    ParagraphGetPopulatedReturn<opts>
  : // Will either return the 3 document types or null if throwError=false
    ParagraphGetPopulatedReturn<opts> | null;

export type ParagraphGetByID = <opts extends ParagraphGetOptions>(
  id: Types.ObjectId | string,
  options: opts
) => ParagraphGetReturn<opts>;
const byIDDefaultOptions: ParagraphGetOptions = {
  throwError: false,
  populate: "none",
};
const byID = (
  Paragraph: ParagraphModel,
  id: Types.ObjectId | string,
  options: GetByIDOptions = byIDDefaultOptions
) => {
  return new Promise(async (resolve, reject) => {
    try {
      options = populateOptions(options, byIDDefaultOptions);
      const paragraph = await Paragraph.findById(id);

      if (!paragraph && options.throwError) {
        throw new Error("Paragraph.getByID: Unable to find paragraph");
      }

      if (options.populate === "normal") {
        resolve(await paragraph?.populateNormal());
      }

      resolve(paragraph);
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  byID,
};
