import Redis from "ioredis";

let redis: any;
// if (process.env.NODE_ENV === "production") {
const host: string | undefined = process.env.REDIS_HOST;
const port: number | undefined = parseInt(process.env.REDIS_PORT || "");

redis = new Redis({
  host,
  port,
});
// } else {
// redis = new Redis();
// }

export default redis;
