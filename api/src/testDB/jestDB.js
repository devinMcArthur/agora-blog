const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

function prepareDatabase(mongoServer) {
  return new Promise(async (resolve, reject) => {
    try {
      mongoServer = new MongoMemoryServer();
      const mongoUri = await mongoServer.getUri();
      await mongoose.connect(
        mongoUri,
        { useNewUrlParser: true, useUnifiedTopology: true },
        (err) => {
          if (err) console.error(err);
        }
      );

      resolve(mongoServer);
    } catch (e) {
      console.error(e);
      reject(e);
    }
  });
}

// Disconnect mongoose and stop server
function disconnectAndStopServer(mongoServer) {
  return new Promise(async (resolve, reject) => {
    try {
      await mongoose.disconnect();
      await mongoServer.stop();

      resolve(mongoServer);
    } catch (e) {
      console.error(e);
      reject(e);
    }
  });
}

module.exports = {
  prepareDatabase,
  disconnectAndStopServer,
};
