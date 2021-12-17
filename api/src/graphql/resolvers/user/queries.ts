import { User } from "@models";
import { IContext } from "@typescript/graphql";
import { Ctx } from "type-graphql";

const user = (id: string) => {
  return User.getById(id);
};

const currentUser = (context: IContext) => {
  return context.user!;
};

export default { user, currentUser };
