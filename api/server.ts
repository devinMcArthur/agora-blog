// Setup environment variables
import * as dotenv from "dotenv";
if (process.env.NODE_ENV === "development" || !process.env.NODE_ENV) {
  dotenv.config({ path: __dirname + "development.env" });
} else {
  throw new Error("Cannot set ENV variables with provided NODE_ENV");
}

// Setup up mongoose
import * as mongoose from "mongoose";

// require("./config/environmentVariables");

console.log(process.env);
mongoose
  .connect(process.env.MONGO_URI!, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("MongoDB Connected");
    await require("./testDB/seedDatabase")();
  })
  .catch((err: Error) => console.error(err));

let port = process.env.PORT || 8080;

const app = require("./app");

const server = app.listen(port, () =>
  console.log(`Server running on port ${port}`)
);

export default server;
