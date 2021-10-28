import { IContext } from "@typescript/graphql";

const validateVerifiedUser = (ctx: IContext) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      if (!ctx.user) throw new Error("Must be logged in to do this");

      if (!ctx.user.verified)
        throw new Error("You do not have permission to do this");

      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  validateVerifiedUser,
};
