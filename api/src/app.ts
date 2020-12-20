import * as path from "path";
import express from "express";
import * as bodyParser from "body-parser";
import cors from "cors";

import pages from "./api/routes/pages";
import questions from "./api/routes/questions";
import variables from "./api/routes/variables";

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static("../client/build"));
  app.get("/*", (req: express.Request, res: express.Response) => {
    res.sendFile(path.resolve("../", "client", "build", "index.html"));
  });
}

app.use(cors());

// Setup API routes

app.use("/api/page", pages);
app.use("/api/question", questions);
app.use("/api/variable", variables);

export default app;
