import {
  UserDocument,
  UserVerificationRequest,
  UserVerificationRequestDocument,
} from "@models";

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
  requestVerification,
};
