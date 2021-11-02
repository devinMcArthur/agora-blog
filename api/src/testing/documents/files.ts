import { File, FileDocument } from "@models";
import _ids from "@testing/_ids";
import { MimeTypeEnum } from "@typescript/models/File";
import { createReadStream } from "fs";

export interface ISeededFiles {
  page_rt_pcr_cycle_threshold_statement_3_v1_image: FileDocument;
}

const createFiles = () => {
  return new Promise<ISeededFiles>(async (resolve, reject) => {
    try {
      const page_rt_pcr_cycle_threshold_statement_3_v1_image = await File.build(
        {
          _id: _ids.files.page_rt_pcr_cycle_threshold_statement_3_v1_image._id,
          mimetype: MimeTypeEnum.JPEG,
          stream: createReadStream(
            "src/testing/assets/viral-culture-per-ct-value.jpg"
          ),
        }
      );

      const files = {
        page_rt_pcr_cycle_threshold_statement_3_v1_image,
      };

      for (let i = 0; i < Object.values(files).length; i++) {
        await Object.values(files)[i].save();
      }

      resolve(files);
    } catch (e) {
      reject(e);
    }
  });
};

export default createFiles;
