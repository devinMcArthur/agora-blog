import { StyleTypes, StyleVariants } from "@typescript/models/Statement";
import { FileUpload, GraphQLUpload } from "graphql-upload";
import { Field, InputType } from "type-graphql";

@InputType()
class StyleValueImageData {
  @Field({ nullable: true })
  public sourceUrl?: string;

  @Field({ nullable: true })
  public caption?: string;

  @Field(() => GraphQLUpload)
  public file!: FileUpload;
}

@InputType()
class StyleValueData {
  @Field({ nullable: true })
  public url?: string;

  @Field({ nullable: true })
  public page?: string;

  @Field({ nullable: true })
  public statement?: string;

  @Field({ nullable: true })
  public variable?: string;

  @Field({ nullable: true })
  public image?: StyleValueImageData;
}

@InputType()
class StringArrayStyleData {
  @Field({ nullable: false })
  public type!: StyleTypes;

  @Field({ nullable: true })
  public variant?: StyleVariants;

  @Field({ nullable: true })
  public value?: StyleValueData;
}

@InputType()
export class StringArrayData {
  @Field({ nullable: true })
  public string?: string;

  @Field(() => [StringArrayStyleData], { nullable: false })
  public styles!: StringArrayStyleData[];
}
