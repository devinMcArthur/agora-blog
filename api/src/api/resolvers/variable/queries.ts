import { Types } from "mongoose";

import { Variable } from "@models";

const variable = async (id: Types.ObjectId) => {
  return await Variable.getById(id);
};

const searchVariables = async (searchString: string) => {
  return Variable.search(searchString);
};

export default { variable, searchVariables };
