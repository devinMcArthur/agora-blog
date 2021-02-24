import _ids from "../_ids";

import User, { UserDocument } from "../../models/User";
import hashPassword from "../../utils/hashPassword";

export interface SeededUsers {
  dev: UserDocument;
}

const createUsers = () => {
  return new Promise<SeededUsers>(async (resolve, reject) => {
    try {
      const dev = new User({
        _id: _ids.users.dev._id,
        username: "dev",
        password: await hashPassword("password"),
        verified: true,
      });

      const users = {
        dev,
      };

      for (let i = 0; i < Object.values(users).length; i++) {
        await Object.values(users)[i].save();
      }

      resolve(users);
    } catch (e) {
      reject(e);
    }
  });
};

export default createUsers;
