import { Types } from "mongoose";
import {
  UserVerificationRequestDocument,
  UserVerificationRequestModel,
} from "@models";
import GetByIDOptions from "@typescript/interface/getById_Options";
import populateOptions from "@utils/populateOptions";

const byIDDefaultOptions: GetByIDOptions = {
  throwError: false,
};
const byId = (
  UserVerificationRequest: UserVerificationRequestModel,
  id: Types.ObjectId | string,
  options: GetByIDOptions = byIDDefaultOptions
) => {
  return new Promise<UserVerificationRequestDocument | null>(
    async (resolve, reject) => {
      try {
        options = populateOptions(options, byIDDefaultOptions);

        const userVerificationRequest = await UserVerificationRequest.findById(
          id
        );

        if (!userVerificationRequest && options.throwError)
          throw new Error(
            "UserVerificationRequest.getById: unable to find a request with that Id"
          );

        resolve(userVerificationRequest);
      } catch (e) {
        reject(e);
      }
    }
  );
};

const byUserId = (
  UserVerification: UserVerificationRequestModel,
  userId: string | Types.ObjectId
) => {
  return new Promise(async (resolve, reject) => {
    try {
      const userVerification = await UserVerification.findOne({
        user: userId,
      });

      resolve(userVerification);
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  byId,
  byUserId,
};
