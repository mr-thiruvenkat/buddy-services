import type { Request, Response } from "express";
import { findUserByUsername, getAllUsers } from "../repositories/user.js";
import status from "../config/status.js";
import { User } from "../types/user.model.js";

export async function getUser(req: Request, res: Response,) {
    try {
        const username = req.query!.username as string;
        if (!username) {
            return res.status(status.badRequest).json({
                message: "Username is required",
            });
        }
        const user = await findUserByUsername(username);
        if (!user) {
            return res.status(status.notFound).json({
                message: "User not found",
            });
        }

        return res.status(status.success).json({
            data: user,
        });

    } catch (error) {
        console.error("Get user failed:", error);
        return res.status(status.error).json({
            message: "Internal server error",
        });
    }
}

export async function getAllUser(req: Request, res: Response){
    const users: User[] = await getAllUsers();
    return res.status(status.success).json({ data: users})
}