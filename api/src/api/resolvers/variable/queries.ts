import { Types } from "mongoose";

import { Variable } from "@models";

const variable = async (id: Types.ObjectId) => {
  return await Variable.getByID(id, { fromCache: true });
};

const searchVariables = async (searchString: string) => {
  return Variable.search(searchString);
};

export default { variable, searchVariables };
