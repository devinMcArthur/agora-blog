import { Types } from "mongoose";
import Variable from "../../../models/Variable";

const variable = async (id: Types.ObjectId) => {
  return await Variable.getByID(id, { fromCache: true });
};

export default { variable };
