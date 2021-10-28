import { User } from "@models";

const login = (email: string, password: string) => {
  return new Promise<string>(async (resolve, reject) => {
    try {
      const token = await User.login(email, password);

      resolve(token);
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  login,
};
