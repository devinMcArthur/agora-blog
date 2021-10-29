import { User } from "@models";
import { Field, InputType } from "type-graphql";

@InputType()
export class LoginData {
  @Field({ nullable: false })
  public email!: string;

  @Field({ nullable: false })
  public password!: string;
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

export default {
  login,
};
