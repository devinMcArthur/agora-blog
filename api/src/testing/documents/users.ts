import _ids from "../_ids";

import { User, UserDocument } from "@models";
import hashPassword from "@utils/hashPassword";

export interface ISeededUsers {
  dev: UserDocument;
  nonVerified: UserDocument;
  verificationRequested: UserDocument;
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
        bio: "I am verified and have authored nearly everything in the test database :)",
        verified: true,
      });

      const nonVerified = new User({
        _id: _ids.users.nonVerified._id,
        firstName: "Not",
        lastName: "Verified",
        email: "not-verified@agora.voto",
        password: await hashPassword("password"),
        bio: "I am not verified",
      });

      const verificationRequested = new User({
        _id: _ids.users.verificationRequested._id,
        firstName: "Verification",
        lastName: "Requested",
        email: "requested-verification@agora.voto",
        password: await hashPassword("password"),
        bio: "I have requested verification",
      });

      const users: ISeededUsers = {
        dev,
        nonVerified,
        verificationRequested,
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
