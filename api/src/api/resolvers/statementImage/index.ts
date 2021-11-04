import { FieldResolver, Resolver, Root } from "type-graphql";

import {
  File,
  FileClass,
  StatementImageClass,
  StatementImageDocument,
} from "@models";

@Resolver(() => StatementImageClass)
export default class StatementImageResolver {
  @FieldResolver(() => FileClass, { nullable: true })
  async file(@Root() image: StatementImageDocument): Promise<FileClass | null> {
    return File.getById(image.file!.toString());
  }
}
