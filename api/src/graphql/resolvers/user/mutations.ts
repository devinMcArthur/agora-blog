import { User, UserDocument } from "@models";
import { IContext } from "@typescript/graphql";
import { Field, InputType } from "type-graphql";

@InputType()
export class LoginData {
  @Field({ nullable: false })
  public email!: string;

  @Field({ nullable: false })
  public password!: string;
}

@InputType()
export class CreateUserData {
  @Field({ nullable: false })
  public firstName!: string;

  @Field({ nullable: false })
  public lastName!: string;

  @Field({ nullable: true })
  public middleName?: string;

  @Field({ nullable: true })
  public bio?: string;

  @Field({ nullable: false })
  public email!: string;

  @Field({ nullable: false })
  public password!: string;

  @Field({ nullable: true })
  public confirmationPassword?: string;
}

@InputType()
export class UpdateUserData {
  @Field({ nullable: true })
  public bio?: string;
}

const login = (data: LoginData) => {
  return new Promise<string>(async (resolve, reject) => {
    try {
      const token = await User.login(data.email, data.password);

      resolve(token);
    } catch (e) {
      reject(e);
    }
  });
};

const create = (data: CreateUserData) => {
  return new Promise<string>(async (resolve, reject) => {
    try {
      const user = await User.build(data);

      await user.save();

      const token = await User.login(data.email, data.password);

      resolve(token);
    } catch (e) {
      reject(e);
    }
  });
};

const requestVerification = (ctx: IContext) => {
  return new Promise<UserDocument>(async (resolve, reject) => {
    try {
      if (!ctx.user) throw new Error("must be logged in");

      const user = ctx.user;

      const request = await user.requestVerification();

      await request.save();

      resolve(user);
    } catch (e) {
      reject(e);
    }
  });
};

const updateUser = (userId: string, data: UpdateUserData, ctx: IContext) => {
  return new Promise<UserDocument>(async (resolve, reject) => {
    try {
      const user = await User.getById(userId);
      if (!user) throw new Error("unable to find this user");

      if (!ctx.user || ctx.user._id.toString() !== user._id.toString())
        throw new Error("you do not have permission to do this");

      await user.change(data);

      await user.save();

      resolve(user);
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  login,
  create,
  requestVerification,
  updateUser,
};
