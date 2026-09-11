import jwt, { SignOptions } from "jsonwebtoken";
import constants from "../config/constants.js";
import status from "../config/status.js";
import { NextFunction, Request, Response } from "express";

export function authenticator(req: Request, res: Response, next: NextFunction) {
    if(!req.headers.authorization){
        return res.status(status.unAuthorized).json({ message: constants.unauthorized });
    }

    const secret_key = process.env.JWT_SECRET;
    if(!secret_key){
        return res.status(status.error).json({ message: constants.invalidToken });
    }

    const [type, token] = req.headers.authorization.split(" ");
    if(type !== constants.authType || !token){
        return res.status(status.error).json({ message: constants.invalidToken });
    }

    try {
        const decoded = jwt.verify(token, secret_key);
        req.user = decoded;
        next();
    } 
    catch(error){
        return res.status(status.unAuthorized).json({ message: constants.unauthorized });
    }
}

export function generator(payload: any){
    const secret_key = process.env.JWT_SECRET;

    if (!secret_key) {
        throw new Error(constants.jwtSecretNotConfigured);
    }

    const options: SignOptions = {
        expiresIn: "1h",
    };

    return jwt.sign(payload, secret_key, options);
}