import { FileClass, FileDocument } from "@models";
import { getFile } from "@utils/digitalOceanSpaces";
import { FieldResolver, Resolver, Root } from "type-graphql";

@Resolver(() => FileClass)
export default class FileResolver {
  @FieldResolver(() => String)
  async buffer(@Root() file: FileDocument): Promise<string | null> {
    const doFile = await getFile(file._id.toString());
    console.log(doFile);
    return Buffer.from(doFile!.Body!).toString("base64");
  }
}
