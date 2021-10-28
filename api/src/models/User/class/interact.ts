import bcrypt from "bcryptjs";
import { UserModel } from "@models";
import createJWT from "@utils/createJWT";

const login = (User: UserModel, email: string, password: string) => {
  return new Promise<string>(async (resolve, reject) => {
    try {
      const user = await User.getByEmail(email);
      if (!user) throw new Error("Email/password was invalid");

      if ((await bcrypt.compare(password, user.password)) === false)
        throw new Error("Email/password was invalid");

      const token = createJWT(
        {
          userId: user._id,
        },
        { expiresIn: 30 * 24 * 60 * 60 }
      );

      resolve(token);
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  login,
};
