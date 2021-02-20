import { getFile } from "../../../utils/digitalOceanSpaces";
import { ImageDocument } from "../../../models/Statement/class";

const buffer = async (image: ImageDocument): Promise<string | null> => {
  return Buffer.from((await getFile(image.name))!.Body!).toString("base64");
};

const contentType = async (image: ImageDocument): Promise<string | null> => {
  return (await getFile(image.name)!).ContentType!;
};

export default { buffer, contentType };
