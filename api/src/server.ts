import "reflect-metadata";
import path from "path";
import cors from "cors";
import * as dotenv from "dotenv";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { configurePersistence, dispatch, Ref, start } from "nact";
// import { PostgresPersistenceEngine } from "nact-persistence-postgres";

import app from "./app";
// import redis from "./redis";
import seedDatabase from "./testDB/seedDatabase";

// Setup environment variables
if (process.env.NODE_ENV === "development" || !process.env.NODE_ENV) {
  dotenv.config({ path: path.join(__dirname, "..", ".env.development") });
}

// Setup up mongoose
import mongoose from "mongoose";
import PageResolver from "./api/resolvers/page";
import VariableResolver from "./api/resolvers/variable";
import ParagraphResolver from "./api/resolvers/paragraph";
import StatementValueResolver from "./api/resolvers/statementValue";
import StatementSourcesResolver from "./api/resolvers/statementSources";
import QuestionResolver from "./api/resolvers/question";
import StatementResolver from "./api/resolvers/statement";
import StatementVersionResolver from "./api/resolvers/statementVersion";
import VariableVersionResolver from "./api/resolvers/variableVersion";
import VariableEquationResolver from "./api/resolvers/variableEquation";
import { spawn_cache_service } from "./actors/cache";

// import { mainPagesListKey } from "./constants/redisKeys";
// import Page from "./models/Page";

let system, cacheService: any;
const main = async () => {
  system = start();
  cacheService = spawn_cache_service(system);

  await mongoose.connect(process.env.MONGO_URI!, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("MongoDB Connected");
  console.log("Database seeding...");
  await seedDatabase();

  let port = process.env.PORT || 8080;

  app.use(cors());

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [
        PageResolver,
        ParagraphResolver,
        VariableResolver,
        QuestionResolver,
        VariableResolver,
        StatementResolver,
        StatementValueResolver,
        VariableVersionResolver,
        VariableEquationResolver,
        StatementSourcesResolver,
        StatementVersionResolver,
      ],
      validate: false,
    }),
    context: ({ req, res }) => ({
      // redis,
      req,
      res,
    }),
  });

  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  // await redis.del(mainPagesListKey);
  // const pages = await Page.getList();
  // const pageStrings = pages.map((page) => JSON.stringify(page));
  // await redis.lpush(mainPagesListKey, ...pageStrings);

  // Initialize actor system
  // configurePersistence(
  //   new PostgresPersistenceEngine(
  //     `${process.env.PG_HOST}:${process.env.PG_PORT}`
  //   )
  // )

  app.listen(port, () => console.log(`Server running on port ${port}`));
};

main().catch((err) => console.error(err));

export { system, cacheService };
