import { Types } from "mongoose";
import { dispatch } from "nact";
import { cacheService } from "../../../server";
import GetByIDOptions from "../../../typescript/interface/getByID_Options";
import performCacheQuery from "../../../utils/performCacheQuery";
import populateOptions from "../../../utils/populateOptions";
import isEmpty from "../../../validation/isEmpty";
import { UserDocument, UserModel } from "..";

const byIDDefaultOptions: GetByIDOptions = {
  throwError: false,
  fromCache: false,
};
const byID = (
  User: UserModel,
  id: Types.ObjectId | string,
  options: GetByIDOptions = byIDDefaultOptions
): Promise<UserDocument | null> => {
  return new Promise(async (resolve, reject) => {
    try {
      options = populateOptions(options, byIDDefaultOptions);

      let user: UserDocument | null = null;
      if (options.fromCache) {
        const cachedUser = await performCacheQuery({
          path: ["users"],
          type: "GET_USER",
          payload: { userID: id },
        });
        if (!isEmpty(cachedUser)) {
          user = new User(cachedUser);
        } else {
          dispatch(cacheService, {
            path: ["users"],
            type: "SET_USER",
            payload: { userID: id },
          });
        }
      }

      if (!user) user = await User.findById(id);

      if (!user && options.throwError) {
        throw new Error("User.getByID: Unable to find user");
      }

      resolve(user);
    } catch (e) {
      reject(e);
    }
  });
};

const byUsernameDefaultOptions: GetByIDOptions = {
  throwError: false,
};
const byUsername = (
  User: UserModel,
  username: string,
  options: GetByIDOptions = byUsernameDefaultOptions
): Promise<UserDocument | null> => {
  return new Promise(async (resolve, reject) => {
    try {
      options = populateOptions(options, byUsernameDefaultOptions);

      const user = await User.findOne({ username });

      if (!user && options.throwError) {
        throw new Error("User.getByID: Unable to find user");
      }

      resolve(user);
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  byID,
  byUsername,
};
