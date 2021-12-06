import { index, prop, Ref } from "@typegoose/typegoose";
import { Types } from "mongoose";
import { PageDocument, ParagraphClass, UserClass } from "@models";
import { Field, ID, ObjectType } from "type-graphql";
import SchemaVersions from "@constants/SchemaVersions";
import replaceSpaces from "@utils/replaceSpaces";

@index({ title: "text" })
@ObjectType()
export class PageSchema {
  @Field(() => ID, { nullable: false })
  public _id!: Types.ObjectId;

  @Field()
  @prop({ required: true, trim: true })
  public title!: string;

  @Field()
  @prop({
    required: true,
    trim: true,
    default: function (this: PageDocument) {
      if (this) {
        return encodeURIComponent(replaceSpaces(this.title));
      }
    },
  })
  public slug!: string;

  @Field(() => [ParagraphClass])
  @prop({ ref: () => ParagraphClass })
  public paragraphs!: Ref<ParagraphClass>[];

  @Field(() => UserClass)
  @prop({ ref: () => UserClass, required: true, immutable: true })
  public originalAuthor!: Ref<UserClass>;

  @Field()
  @prop({ required: true, default: 0 })
  public referencedCount!: number;

  @Field({ nullable: false })
  @prop({ required: true, default: SchemaVersions.Page })
  public schemaVersion!: number;

  @Field({ nullable: false })
  @prop({ required: true, default: Date.now, immutable: true })
  public createdAt!: Date;
}
