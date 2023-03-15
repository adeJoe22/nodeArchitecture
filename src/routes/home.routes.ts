import { Router, Request, Response } from "express";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  return res.status(200).json({
    message: `Welcome Home`,
  });
});

export default router;
