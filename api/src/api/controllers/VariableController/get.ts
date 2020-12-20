import { Request, Response } from "express";
import Variable from "../../../models/Variable";

const byID = (req: Request, res: Response) => {
  return new Promise(async (resolve, reject) => {
    try {
      const variable = await Variable.getByID(req.params.variableID, {
        throwError: false,
        populate: "full",
      });

      if (!variable)
        res.status(404).send("Unable to find a Variable with that ID");

      resolve({ variable });
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  byID,
};
