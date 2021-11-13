import express from "express";
import cors from "cors";
import { graphqlUploadExpress } from "graphql-upload";
import { buildTypeDefsAndResolvers } from "type-graphql";
import { makeExecutableSchema } from "graphql-tools";
import { ApolloServer } from "apollo-server-express";
import jwt from "jsonwebtoken";

import { IContext } from "@typescript/graphql";

import UserResolver from "@api/resolvers/user";
import PageResolver from "@api/resolvers/page";
import FileResolver from "@api/resolvers/file";
import VariableResolver from "@api/resolvers/variable";
import QuestionResolver from "@api/resolvers/question";
import ParagraphResolver from "@api/resolvers/paragraph";
import StatementResolver from "@api/resolvers/statement";
import StatementImageResolver from "@api/resolvers/statementImage";
import StatementValueResolver from "@api/resolvers/statementValue";
import VariableVersionResolver from "@api/resolvers/variableVersion";
import StatementVersionResolver from "@api/resolvers/statementVersion";
import VariableEquationResolver from "@api/resolvers/variableEquation";
import ParagraphStatementResolver from "@api/resolvers/paragraphStatement";
import VariableEditProposalResolver from "@api/resolvers/variableEditProposal";
import ParagraphEditProposalResolver from "@api/resolvers/paragraphEditProposal";
import ParagraphEditProposalStatementResolver from "@api/resolvers/paragraphEditProposalStatement";

import { User, UserDocument } from "@models";
import authChecker from "@utils/authChecker";

const createApp = async () => {
  const app = express();

  app.use(cors());

  const { typeDefs, resolvers } = await buildTypeDefsAndResolvers({
    resolvers: [
      UserResolver,
      PageResolver,
      FileResolver,
      StatementImageResolver,
      ParagraphResolver,
      VariableResolver,
      QuestionResolver,
      VariableResolver,
      StatementResolver,
      StatementValueResolver,
      VariableVersionResolver,
      VariableEquationResolver,
      StatementVersionResolver,
      ParagraphStatementResolver,
      VariableEditProposalResolver,
      ParagraphEditProposalResolver,
      ParagraphEditProposalStatementResolver,
    ],
    authChecker,
  });

  const schema = makeExecutableSchema({
    resolvers: resolvers,
    typeDefs,
  });

  const apolloServer = new ApolloServer({
    schema,
    context: async ({ req, res }: IContext) => {
      const token = req.headers.authorization;

      let user: UserDocument | null = null;

      if (token) {
        const decoded: any = jwt.decode(token);

        user = await User.getById(decoded?.userId);
      }

      return {
        user,
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
