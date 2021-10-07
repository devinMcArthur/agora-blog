import { Types } from "mongoose";

import { Statement } from "@models";

const statement = async (id: Types.ObjectId) => {
  return await Statement.getByID(id, { fromCache: true });
};

export default { statement };
