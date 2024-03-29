import "reflect-metadata";
import path from "path";
import mongoose from "mongoose";
import * as dotenv from "dotenv";

import seedDatabase from "./testing/seedDatabase";

// Setup environment variables
if (process.env.NODE_ENV === "development" || !process.env.NODE_ENV) {
  dotenv.config({ path: path.join(__dirname, "..", ".env.development") });
}

import createApp from "./app";
import updateDocuments from "@utils/updateDocuments";
import { logger } from "@logger";
import elasticsearch from "./elasticsearch";
import saveAll from "@testing/saveAll";

const production = process.env.NODE_ENV === "production";

const main = async () => {
  try {
    await elasticsearch();

    if (process.env.NODE_ENV !== "test") {
      await mongoose.connect(process.env.MONGO_URI!, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("MongoDB Connected");

      if (process.env.NODE_ENV !== "production" && !!process.env.NODE_ENV) {
        console.log("Database seeding...");
        await seedDatabase();
      }
    }

    await updateDocuments();

    let port = process.env.PORT || 8080;

    const app = await createApp();

    app.listen(port, () => console.log(`Server running on port: ${port}`));

    if (process.env.NODE_ENV !== "test") {
      if (production) {
        await saveAll();
      }
    }
  } catch (error: any) {
    logger.error({
      message: error.message || "Server errror",
      meta: {
        ...error,
      },
    });
  }
};

main().catch((err) => console.error(err));
