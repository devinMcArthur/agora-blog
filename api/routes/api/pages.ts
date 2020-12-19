import { Router } from "express";

import PageController from "../../controllers/PageController";

import routeErrorHandler from "../utils/routeErrorHandler";

const router = Router();

router.get("/list", async (req, res) => {
  try {
    res.json(await PageController.get.list(req, res));
  } catch (e) {
    routeErrorHandler(e, req, res);
  }
});

export default router;
