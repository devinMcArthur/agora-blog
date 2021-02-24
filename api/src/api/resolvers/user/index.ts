import { UserDocument } from "../../../models/User";
import User from "../../../models/User/class";
import {
  Arg,
  Args,
  ArgsType,
  Ctx,
  Field,
  ID,
  Mutation,
  Query,
  Resolver,
  InterfaceType,
  ObjectType,
  Authorized,
} from "type-graphql";
import queries from "./queries";
import AuthContext from "src/typescript/interface/authContext";
import mutations from "./mutations";

@ArgsType()
class GetUserArgs {
  @Field(() => ID, { nullable: true })
  id?: string;

  @Field({ nullable: true })
  username?: string;
}

@ObjectType()
class LoginResponse {
  @Field()
  token!: string;

  @Field()
  user!: User;
}

@Resolver(() => User)
export default class UserResolver {
  /**
   * Queries
   */

  @Query(() => User, { nullable: true })
  async user(
    @Args() { id, username }: GetUserArgs
  ): Promise<UserDocument | null> {
    return queries.user({ id, username });
  }

  /**
   * Mutations
   */

  @Mutation(() => LoginResponse, { nullable: true })
  async login(
    @Arg("username") username: string,
    @Arg("password") password: string,
    @Ctx() ctx: AuthContext
  ) {
    return await mutations.login(username, password, ctx);
  }

  @Authorized(["USER", "USER_VERIFIED"])
  @Mutation(() => User, { nullable: true })
  async userEdit(
    @Arg("id") id: string,
    @Arg("name", { nullable: true }) name?: string
  ) {
    return await mutations.userEdit(id, name);
  }
}
