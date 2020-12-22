// Setup environment variables
import path from "path";
import * as dotenv from "dotenv";
import seedDatabase from "./testDB/seedDatabase";

if (process.env.NODE_ENV === "development" || !process.env.NODE_ENV) {
  dotenv.config({ path: path.join(__dirname, "..", ".env.development") });
}

// Setup up mongoose
import mongoose from "mongoose";

mongoose
  .connect(process.env.MONGO_URI!, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("MongoDB Connected");
    await seedDatabase();
  })
  .catch((err: Error) => console.error(err));

let port = process.env.PORT || 8080;

import app from "./app";

const server = app.listen(port, () =>
  console.log(`Server running on port ${port}`)
);

export default server;
