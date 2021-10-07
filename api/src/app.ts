import express from "express";
import cors from "cors";
import { graphqlUploadExpress } from "graphql-upload";
import { buildTypeDefsAndResolvers } from "type-graphql";
import { makeExecutableSchema } from "graphql-tools";
import { ApolloServer } from "apollo-server-express";

import { IContext } from "@typescript/graphql";

import PageResolver from "@api/resolvers/page";
import VariableResolver from "@api/resolvers/variable";
import QuestionResolver from "@api/resolvers/question";
import ParagraphResolver from "@api/resolvers/paragraph";
import StatementResolver from "@api/resolvers/statement";
import StatementValueResolver from "@api/resolvers/statementValue";
import VariableVersionResolver from "@api/resolvers/variableVersion";
import StatementSourcesResolver from "@api/resolvers/statementSources";
import StatementVersionResolver from "@api/resolvers/statementVersion";
import VariableEquationResolver from "@api/resolvers/variableEquation";
import ImageResolver from "@api/resolvers/image";

const createApp = async () => {
  const app = express();

  app.use(cors());

  const { typeDefs, resolvers } = await buildTypeDefsAndResolvers({
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
      ImageResolver,
    ],
  });

  const schema = makeExecutableSchema({
    resolvers: resolvers,
    typeDefs,
  });

  const apolloServer = new ApolloServer({
    schema,
    context: async ({ req, res }: IContext) => {
      // const token = req.headers.authorization;

      // let user: UserDocument | null = null;

      // if (token) {
      //   const decoded: any = decode(token);

      //   user = await User.getById(decoded?.userId);
      // }

      return {
        req,
        res,
      };
    },
    uploads: false,
  });

  app.use(
    graphqlUploadExpress({
      maxFileSize: 100000000, // 100mb
      maxFiles: 20,
    })
  );

  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  return app;
};

export default createApp;
