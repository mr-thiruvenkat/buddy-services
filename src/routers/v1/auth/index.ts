import { Router } from "express";
import { loginUser } from "../../../controllers/auth.controller.js";

const authRouter = Router();

authRouter.get("/login", loginUser);

export default authRouter;