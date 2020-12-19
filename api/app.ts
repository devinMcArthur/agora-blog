import * as path from "path";
import express from "express";
import * as bodyParser from "body-parser";

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static("../client/build"));
  app.get("/*", (req: express.Request, res: express.Response) => {
    res.sendFile(path.resolve("../", "client", "build", "index.html"));
  });
}

const cors = require("cors");
app.use(cors());

// Setup API routes

app.use("/api/page", require("./routes/api/pages"));

module.exports = app;
