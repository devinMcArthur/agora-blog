import { FileDocument, FileModel } from "@models";
import { FileBuildData } from "@typescript/models/File";
import { uploadFile } from "@utils/digitalOceanSpaces";

const build = (File: FileModel, data: FileBuildData) => {
  return new Promise<FileDocument>(async (resolve, reject) => {
    try {
      const file = new File({
        _id: data._id,
        mimetype: data.mimetype,
      });

      await uploadFile(file._id.toString(), data.stream, data.mimetype);

      await file.validateDocument();

      await file.save();

      resolve(file);
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  build,
};
