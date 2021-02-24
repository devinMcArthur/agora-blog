import bcrypt from "bcryptjs";

import createJWT from "../../../utils/createJWT";
import User, { UserDocument } from "../../../models/User";
import AuthContext from "../../../typescript/interface/authContext";
import { UserInputError } from "apollo-server-express";

const login = (username: string, password: string, ctx: AuthContext) => {
  return new Promise<{ token: string; user: UserDocument } | null>(
    async (resolve, reject) => {
      try {
        const user = await User.getByUsername(username);

        if (!user)
          throw new UserInputError("Invalid username", {
            invalidArgs: "username",
          });

        const valid = await bcrypt.compare(password, user.password);

        if (!valid) throw new UserInputError("Invalid login");

        const payload: AuthContext = {
          user: {
            id: user._id.toString(),
            username: user.username,
            verified: user.verified,
          },
        };
        const token = await createJWT(payload);

        resolve({ token, user });
      } catch (e) {
        reject(e);
      }
    }
  );
};

const userEdit = (id: string, name?: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await User.getByID(id);

      if (user) {
        user.name = name;

        await user.save();
      }

      resolve(user);
    } catch (e) {
      reject(e);
    }
  });
};

export default { login, userEdit };
