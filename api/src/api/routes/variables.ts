import { Router } from "express";

import VariableController from "../controllers/VariableController";

import routeErrorHandler from "../utils/routeErrorHandler";

const router = Router();

router.get("/:variableID", async (req, res) => {
  try {
    res.json(await VariableController.get.byID(req, res));
  } catch (e) {
    routeErrorHandler(e, req, res);
  }
});

export default router;
