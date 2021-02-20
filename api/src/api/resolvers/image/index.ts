import { Image, ImageDocument } from "../../../models/Statement/class";
import { FieldResolver, Resolver, Root } from "type-graphql";
import fieldResolvers from "./fieldResolvers";

@Resolver(() => Image)
export default class ImageResolver {
  @FieldResolver(() => String)
  async buffer(@Root() image: ImageDocument): Promise<string | null> {
    return fieldResolvers.buffer(image);
  }

  @FieldResolver(() => String)
  async contentType(@Root() image: ImageDocument): Promise<string | null> {
    return fieldResolvers.contentType(image);
  }
}
