import { Request, Response } from "express";

export default function routeErrorHandler(
  e: Error,
  req: Request,
  res: Response
) {
  console.log(e);
  let errors = { general: e.message };
  res.status(500).json(errors);
}
