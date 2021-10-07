import "reflect-metadata";
import path from "path";
import cors from "cors";
import { start } from "nact";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import { buildSchema } from "type-graphql";
import { ApolloServer } from "apollo-server-express";

import app from "./app";
import seedDatabase from "./testing/seedDatabase";

// Setup environment variables
if (process.env.NODE_ENV === "development" || !process.env.NODE_ENV) {
  dotenv.config({ path: path.join(__dirname, "..", ".env.development") });
}

import { spawn_cache_service } from "./actors/cache";
import createApp from "./app";

let system, cacheService: any, apolloServer: any;
const main = async () => {
  system = start();
  cacheService = spawn_cache_service(system);

  if (process.env.NODE_ENV !== "test") {
    await mongoose.connect(process.env.MONGO_URI!, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected");
    console.log("Database seeding...");
    await seedDatabase();
  }

  let port = process.env.PORT || 8080;

  const app = await createApp();

  app.listen(port, () => console.log(`Server running on port ${port}`));
};

main().catch((err) => console.error(err));

export { system, cacheService, apolloServer };
