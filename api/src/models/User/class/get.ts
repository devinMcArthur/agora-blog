import { Types } from "mongoose";
import { UserClass, UserDocument, UserModel } from "@models";
import GetByIDOptions from "@typescript/interface/getById_Options";
import populateOptions from "@utils/populateOptions";

const byIDDefaultOptions: GetByIDOptions = {
  throwError: false,
};
const byId = (
  User: UserModel,
  id: Types.ObjectId | string,
  options: GetByIDOptions = byIDDefaultOptions
) => {
  return new Promise<UserDocument | null>(async (resolve, reject) => {
    try {
      options = populateOptions(options, byIDDefaultOptions);

      const user = await User.findById(id);

      if (!user && options.throwError)
        throw new Error("User.getById: unable to find a user with that Id");

      resolve(user);
    } catch (e) {
      reject(e);
    }
  });
};

const byEmailDefaultOptions: GetByIDOptions = {
  throwError: false,
};
const byEmail = (
  User: UserModel,
  email: string,
  options: GetByIDOptions = byEmailDefaultOptions
) => {
  return new Promise<UserDocument | null>(async (resolve, reject) => {
    try {
      options = populateOptions(options, byEmailDefaultOptions);

      const user = await User.findOne({ email });
      if (!user && options.throwError)
        throw new Error(
          "User.getByEmail: unable to find a user with that email"
        );

      resolve(user);
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  byId,
  byEmail,
};
