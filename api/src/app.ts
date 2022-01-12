import express from "express";
import cors from "cors";
import { graphqlUploadExpress } from "graphql-upload";
import { buildTypeDefsAndResolvers } from "type-graphql";
import { makeExecutableSchema } from "graphql-tools";
import { ApolloServer } from "apollo-server-express";
import jwt from "jsonwebtoken";

import { IContext } from "@typescript/graphql";

import UserResolver from "@graphql/resolvers/user";
import PageResolver from "@graphql/resolvers/page";
import FileResolver from "@graphql/resolvers/file";
import VariableResolver from "@graphql/resolvers/variable";
import QuestionResolver from "@graphql/resolvers/question";
import ParagraphResolver from "@graphql/resolvers/paragraph";
import StatementResolver from "@graphql/resolvers/statement";
import StatementImageResolver from "@graphql/resolvers/statementImage";
import StatementValueResolver from "@graphql/resolvers/statementValue";
import VariableVersionResolver from "@graphql/resolvers/variableVersion";
import StatementVersionResolver from "@graphql/resolvers/statementVersion";
import VariableEquationResolver from "@graphql/resolvers/variableEquation";
import ParagraphStatementResolver from "@graphql/resolvers/paragraphStatement";
import VariableEditProposalResolver from "@graphql/resolvers/variableEditProposal";
import ParagraphEditProposalResolver from "@graphql/resolvers/paragraphEditProposal";
import ParagraphEditProposalStatementResolver from "@graphql/resolvers/paragraphEditProposalStatement";

import { User, UserDocument } from "@models";
import authChecker from "@utils/authChecker";
import { logger } from "@logger";

const createApp = async () => {
  const app = express();

  app.use(cors());

  app.use(express.json({ limit: "100mb" }));

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
    plugins: [
      {
        requestDidStart: () => {
          return {
            didEncounterErrors: (context) => {
              logger.error({
                message: context.errors[0].message || "Apollo request error",
                meta: {
                  variables: context.request.variables,
                  errors: context.errors,
                  operationName: context.operationName,
                },
              });
            },
          };
        },
      },
    ],
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
