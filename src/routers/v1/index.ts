import { Request, Response, Router } from "express";
import authRouter from "./auth/index.js";
import userRouter from "./user/index.js";

const router = Router();

router.get("/health", (req: Request, res: Response) => {
    res.json({
        version: "v1",
        time: Date.now(),
        message: "v1 Api's are running",
    });
});

router.use("/auth", authRouter);
router.use("/user", userRouter);

export default router;