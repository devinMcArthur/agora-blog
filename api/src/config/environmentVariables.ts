import dotenv from "dotenv";

if (process.env.NODE_ENV === "development") {
  dotenv.config({ path: __dirname + "/development.env" });
} else {
  throw new Error("Invalid NODE_ENV provided");
}

export default dotenv;
