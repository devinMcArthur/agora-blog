import _ids from "../_ids";

import { User, UserDocument } from "@models";
import hashPassword from "@utils/hashPassword";

export interface ISeededUsers {
  dev: UserDocument;
  nonVerified: UserDocument;
}

const createUsers = () => {
  return new Promise<ISeededUsers>(async (resolve, reject) => {
    try {
      const dev = new User({
        _id: _ids.users.dev._id,
        firstName: "Dev",
        lastName: "Mc",
        middleName: "Mic",
        email: "dev@agora.voto",
        password: await hashPassword("password"),
        verified: true,
      });

      const nonVerified = new User({
        _id: _ids.users.nonVerified._id,
        firstName: "Not",
        lastName: "Verified",
        email: "not-verified@agora.voto",
        password: await hashPassword("password"),
      });

      const users: ISeededUsers = {
        dev,
        nonVerified,
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
