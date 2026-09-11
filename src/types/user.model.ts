import { ObjectId } from "mongodb";

export interface User {
    _id?: ObjectId;
    id?: string;
    displayName: string;
    profilePictureUrl: string | null;
    username: string;
    password: string;
    createdAt?: Date;
    updatedAt?: Date;
}