import { Router } from "express";

const authRouter = Router();

authRouter.get("/login", (req, res) => {
    res.json({
        message: "V1 login API",
    });
});

export default authRouter;