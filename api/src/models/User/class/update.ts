import {
  UserDocument,
  UserVerificationRequest,
  UserVerificationRequestDocument,
} from "@models";
import { IUserUpdateData } from "@typescript/models/User";

const change = (user: UserDocument, data: IUserUpdateData) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      user.bio = data.bio;

      await user.validateDocument();

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

const requestVerification = (user: UserDocument) => {
  return new Promise<UserVerificationRequestDocument>(
    async (resolve, reject) => {
      try {
        const userVerficationRequest = await UserVerificationRequest.build(
          user
        );

        resolve(userVerficationRequest);
      } catch (e) {
        reject(e);
      }
    }
  );
};

export default {
  change,
  requestVerification,
};
