import { Field, InputType } from "type-graphql";

@InputType()
export class PaginationOptions {
  @Field({ nullable: true })
  public limit?: number;

  @Field({ nullable: true })
  public page?: number;
}
