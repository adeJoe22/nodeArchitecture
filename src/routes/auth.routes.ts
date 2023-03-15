import { Router } from "express";
import { login, register } from "../controllers/user.controller";
import {
  loginValidation,
  registerValidation,
} from "../middleware/validator/userValidation/userValidation";

const router = Router();

router.post("/register", registerValidation, register);
router.post("/login", loginValidation, login);
export default router;
