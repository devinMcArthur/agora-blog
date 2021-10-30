import { UserDocument, UserModel } from "@models";
import { IUserData } from "@typescript/models/User";
import hashPassword from "@utils/hashPassword";

const build = (User: UserModel, data: IUserData) => {
  return new Promise<UserDocument>(async (resolve, reject) => {
    try {
      const password = await hashPassword(data.password);

      const user = new User({
        ...data,
        password,
      });

      await user.validateDocument();

      resolve(user);
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  build,
};
