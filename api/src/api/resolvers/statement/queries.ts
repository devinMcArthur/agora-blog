import { Types } from "mongoose";
import Statement from "../../../models/Statement";

const statement = async (id: Types.ObjectId) => {
  return await Statement.getByID(id, { fromCache: true });
};

export default { statement };
