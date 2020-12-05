import { Types } from "mongoose";

import { VariablePopulatedFull } from "../typescript/interfaces/documents/Variable";
import APIService from "./apiService";

export default function VariableService() {
  // Get variable populated by ID
  const getVariableByID = (variableID: Types.ObjectId) => {
    return new Promise<VariablePopulatedFull>((resolve, reject) => {
      APIService()
        .apiCall({
          endpoint: "/variableByID",
          options: { params: { variableID } },
        })
        .then((res) => resolve(res.data.variable))
        .catch((err) => reject(err));
    });
  };

  return {
    getVariableByID,
  };
}
