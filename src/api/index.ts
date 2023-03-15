import { Router } from "express";
import homeRoute from "../routes/home.routes";
import authRoute from "../routes/auth.routes";
const router = Router();

router.use("/", homeRoute);
router.use("/auth", authRoute);

export default router;
