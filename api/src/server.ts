import "reflect-metadata";
import path from "path";
import cors from "cors";
import * as dotenv from "dotenv";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";

import app from "./app";
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

const main = async () => {
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
      req,
      res,
    }),
  });

  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  app.listen(port, () => console.log(`Server running on port ${port}`));
};

main().catch((err) => console.error(err));
