import { Types } from "mongoose";
import { ReadStream } from "fs";

export enum MimeTypeEnum {
  PNG = "image/png",
  JPEG = "image/jpeg",
  GIF = "image/gif",
}

export interface FileBuildData {
  _id?: Types.ObjectId;
  stream: ReadStream;
  mimetype: string;
}
