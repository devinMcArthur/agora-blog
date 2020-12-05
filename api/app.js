const path = require("path");

const express = require("express");

const app = express();

var forceSsl = function (req, res, next) {
  // NOTE: the header "x-forwarded-proto" is provided by the Heroku load-balancer so it's not going to work in other environments
  if (req.headers["x-forwarded-proto"] !== "https") {
    return res.redirect(["https://", req.get("Host"), req.url].join(""));
  }
  return next();
};

if (process.env.NODE_ENV === "production") {
  app.use(forceSsl);
  app.use(express.static("../client/build"));
  app.get("/*", (req, res) => {
    res.sendFile(path.resolve("../", "client", "build", "index.html"));
  });
} else {
  console.log("Server is intended only for production");
  process.exit();
}

const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`Server running on port ${port}`));
