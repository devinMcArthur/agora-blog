import { Types } from "mongoose";
import Topic from "../../../models/Topic";

const topic = async (id: Types.ObjectId) => {
  return await Topic.getByID(id, { fromCache: true });
};

export default { topic };
