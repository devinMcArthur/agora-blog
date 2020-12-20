import { Router } from "express";

import QuestionController from "../controllers/QuestionController";

import routeErrorHandler from "../utils/routeErrorHandler";

const router = Router();

router.get("/list", async (req, res) => {
  try {
    res.json(await QuestionController.get.list(req, res));
  } catch (e) {
    routeErrorHandler(e, req, res);
  }
});

router.get("/:questionID", async (req, res) => {
  try {
    res.json(await QuestionController.get.byID(req, res));
  } catch (e) {
    routeErrorHandler(e, req, res);
  }
});

export default router;
