import { Types } from "mongoose";
import { FileDocument, FileModel } from "@models";
import { FileBuildData } from "@typescript/models/File";
import { ObjectType } from "type-graphql";
import { FileSchema } from "../schema";
import build from "./build";
import remove from "./remove";
import validate from "./validate";
import GetByIDOptions from "@typescript/interface/getById_Options";
import get from "./get";

@ObjectType()
export class FileClass extends FileSchema {
  /**
   * ----- Get -----
   */

  public static async getById(
    this: FileModel,
    id: Types.ObjectId | string,
    options?: GetByIDOptions
  ) {
    return get.byId(this, id, options);
  }

  /**
   * ----- Build -----
   */

  public static async build(this: FileModel, data: FileBuildData) {
    return build.build(this, data);
  }

  /**
   * ----- Validate -----
   */

  public async validateDocument(this: FileDocument) {
    return validate.document(this);
  }

  /**
   * ----- Remove -----
   */

  public static async removeAll(this: FileModel) {
    return remove.all(this);
  }

  public async fullRemove(this: FileDocument) {
    return remove.full(this);
  }
}
