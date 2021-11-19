import {
  UserDocument,
  UserVerificationRequestDocument,
  UserVerificationRequestModel,
} from "@models";

const build = (
  UserVerificationRequest: UserVerificationRequestModel,
  user: UserDocument
) => {
  return new Promise<UserVerificationRequestDocument>(
    async (resolve, reject) => {
      try {
        if (user.verified) throw new Error("this user is already verified");

        const existingVerficication = await UserVerificationRequest.getByUserId(
          user._id
        );
        if (existingVerficication)
          throw new Error("this user has already requested verification");

        const userVerification = new UserVerificationRequest({
          user: user._id,
        });

        resolve(userVerification);
      } catch (e) {
        reject(e);
      }
    }
  );
};

export default { build };
