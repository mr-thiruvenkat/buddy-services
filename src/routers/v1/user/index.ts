import { Request, Response, Router } from "express";
import { authenticator } from "../../../middleware/middleware.js";

const userRouter = Router();
userRouter.use(authenticator);

userRouter.get("/", (req: Request, res: Response) => {
    res.json({ data: { user: "User API" } });
});

userRouter.get("/all", (req: Request, res: Response) => {
    res.json({ data: { user: ["All Users"] } });
});

export default userRouter;