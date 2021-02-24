import jwt, { SignOptions } from "jsonwebtoken";

export default (payload: any, options?: SignOptions) => {
  return new Promise<string>(async (resolve, reject) => {
    try {
      let token;

      if (options) {
        token = jwt.sign(payload, "shhhthisisasecret", options);
      } else {
        token = jwt.sign(payload, "shhhthisisasecret");
      }

      resolve(token);
    } catch (e) {
      reject(e);
    }
  });
};
