import { Request, Response } from "express";
import Question from "../../../models/Question";

const list = (req: Request, res: Response) => {
  return new Promise(async (resolve, reject) => {
    try {
      const questions = await Question.getList();

      resolve({ questions });
    } catch (e) {
      reject(e);
    }
  });
};

const byID = (req: Request, res: Response) => {
  return new Promise(async (resolve, reject) => {
    try {
      const question = await Question.getByID(req.params.questionID, {
        throwError: false,
        populate: "normal",
      });

      if (!question)
        res.status(404).send("Unable to find a Question with that ID");

      resolve({ question });
    } catch (e) {
      reject(e);
    }
  });
};

export default {
  list,
  byID,
};
