const build = () => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  build,
};
