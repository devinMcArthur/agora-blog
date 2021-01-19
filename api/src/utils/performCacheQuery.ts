import { query } from "nact";
import { cacheService } from "../server";

const performCacheQuery = async (msg: any) => {
  return (
    await query(cacheService, (sender) => Object.assign(msg, { sender }), 5000)
  ).payload;
};

export default performCacheQuery;
