import { FileClass, FileDocument } from "@models";
import { getFile } from "@utils/digitalOceanSpaces";
import { FieldResolver, Resolver, Root } from "type-graphql";

@Resolver(() => FileClass)
export default class FileResolver {
  @FieldResolver(() => String)
  async buffer(@Root() file: FileDocument): Promise<string | null> {
    return `data:${file.mimetype};base64,${Buffer.from(
      (await getFile(file._id.toString()))!.Body!
    ).toString("base64")}`;
  }
}
