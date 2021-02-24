import bcrypt from "bcryptjs";

export default (password: string) => {
  return new Promise<string>(async (resolve, reject) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);

      resolve(hash);
    } catch (e) {
      reject(e);
    }
  });
};
