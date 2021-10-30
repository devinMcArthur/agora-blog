import { UserClass } from "@models";
import { IContext } from "@typescript/graphql";
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import mutations, { CreateUserData, LoginData } from "./mutations";
import queries from "./queries";

@Resolver(() => UserClass)
export default class UserResolver {
  /**
   * ----- Queries -----
   */

  @Authorized()
  @Query(() => UserClass)
  async currentUser(@Ctx() context: IContext) {
    return queries.currentUser(context);
  }

  @Query(() => UserClass)
  async user(@Arg("id") id: string) {
    return queries.user(id);
  }

  /**
   * ----- Mutations -----
   */

  @Mutation(() => String)
  async login(@Arg("data") data: LoginData) {
    return mutations.login(data);
  }

  @Mutation(() => String)
  async createUser(@Arg("data") data: CreateUserData) {
    return mutations.create(data);
  }
}
