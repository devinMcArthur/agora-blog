import { Types } from "mongoose";
import { FileDocument, FileModel } from "@models";
import GetByIDOptions from "@typescript/interface/getByID_Options";
import populateOptions from "@utils/populateOptions";

const byIdDefaultOptions: GetByIDOptions = {
  throwError: false,
};
const byId = (
  File: FileModel,
  id: Types.ObjectId | string,
  options: GetByIDOptions = byIdDefaultOptions
): Promise<FileDocument | null> => {
  return new Promise(async (resolve, reject) => {
    try {
      options = populateOptions(options, byIdDefaultOptions);

      const file = await File.findById(id);

      if (!file && options.throwError) {
        throw new Error("File.getByID: Unable to find file");
      }

      resolve(file);
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  byId,
};
