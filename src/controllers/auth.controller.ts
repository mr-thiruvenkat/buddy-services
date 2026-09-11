import { Request, Response } from "express";
import status from "../config/status.js";
import { createUser, findUser } from "../repositories/user.js";
import { User } from "../types/user.model.js";
import { generator } from "../middleware/middleware.js";

export async function loginUser(req: Request, res: Response) {
    try {
        const {username, password, isNewUser} = req.body!;
        
        if(!username || !password){
            return res.status(status.error).json({ message: "Invalid username and password!"})
        }

        const user: User | null = await findUser(username, password);
        if(!user && !isNewUser){
            return res.status(status.error).json({ message: "Invalid username and password!"})
        }

        if(isNewUser){
            const data: User = {
                username,
                password,
                displayName: username,
                profilePictureUrl: null,
            }
            const newUser = await createUser(data);
            return generateToken(res, newUser)
        }

        return generateToken(res, user!);

    }
    catch(error){
        return res.status(status.error).json({ message: "An error occurred while logging in!" });
    }
}

function generateToken(res: Response, user: User) {
    return res.status(status.success).json({
        message: "Login successful!",
        token: generator(user),
        data: user
    });
}