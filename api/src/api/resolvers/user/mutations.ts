import { User } from "@models";
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

  @Field({ nullable: false })
  public email!: string;

  @Field({ nullable: false })
  public password!: string;

  @Field({ nullable: true })
  public confirmationPassword?: string;
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

export default {
  login,
  create,
};
