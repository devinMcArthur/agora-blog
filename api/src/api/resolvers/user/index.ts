import { UserClass } from "@models";
import { Arg, Mutation, Resolver } from "type-graphql";
import mutations from "./mutations";

@Resolver(() => UserClass)
export default class UserResolver {
  @Mutation(() => String)
  async login(@Arg("email") email: string, @Arg("password") password: string) {
    return mutations.login(email, password);
  }
}
