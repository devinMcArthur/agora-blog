import "reflect-metadata";
import path from "path";
import cors from "cors";
import { start } from "nact";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import { buildSchema } from "type-graphql";
import { ApolloServer } from "apollo-server-express";
// import { PostgresPersistenceEngine } from "nact-persistence-postgres";

import app from "./app";
// import redis from "./redis";
import seedDatabase from "./testDB/seedDatabase";

// Setup environment variables
if (process.env.NODE_ENV === "development" || !process.env.NODE_ENV) {
  dotenv.config({ path: path.join(__dirname, "..", ".env.development") });
}

// Setup up mongoose
import PageResolver from "./api/resolvers/page";
import VariableResolver from "./api/resolvers/variable";
import QuestionResolver from "./api/resolvers/question";
import ParagraphResolver from "./api/resolvers/paragraph";
import StatementResolver from "./api/resolvers/statement";
import StatementValueResolver from "./api/resolvers/statementValue";
import VariableVersionResolver from "./api/resolvers/variableVersion";
import StatementSourcesResolver from "./api/resolvers/statementSources";
import StatementVersionResolver from "./api/resolvers/statementVersion";
import VariableEquationResolver from "./api/resolvers/variableEquation";
import TopicResolver from "./api/resolvers/topic";
import TopicRowResolver from "./api/resolvers/topicRow";
import TopicColumnResolver from "./api/resolvers/topicColumn";

import { spawn_cache_service } from "./actors/cache";

// import { mainPagesListKey } from "./constants/redisKeys";
// import Page from "./models/Page";

let system, cacheService: any, apolloServer: any;
const main = async () => {
  system = start();
  cacheService = spawn_cache_service(system);

  console.log(process.env.NODE_ENV);
  console.log(process.env.MONGO_URI);
  await mongoose.connect(process.env.MONGO_URI!, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("MongoDB Connected");
  console.log("Database seeding...");
  await seedDatabase();

  let port = process.env.PORT || 8080;

  app.use(cors());

  apolloServer = new ApolloServer({
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
        TopicResolver,
        TopicRowResolver,
        TopicColumnResolver,
      ],
      validate: false,
    }),
    context: ({ req, res }: { req: any; res: any }) => ({
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

export { system, cacheService, apolloServer };
