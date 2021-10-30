import { User, UserDocument } from "@models";

const document = (user: UserDocument) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      const existingEmail = await User.getByEmail(user.email);
      if (existingEmail && existingEmail._id.toString() !== user._id.toString())
        throw new Error(
          "user.validateDocument: user with this email already exists"
        );

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  document,
};
