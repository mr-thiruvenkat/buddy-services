import { Router } from "express";
import { authenticator } from "../../../middleware/middleware.js";
import { getAllUser, getUser } from "../../../controllers/user.controller.js";

const userRouter = Router();
userRouter.use(authenticator);

userRouter.get("/me", getUser);

userRouter.get("/find-user", getUser);

userRouter.get("/all", getAllUser);

export default userRouter;