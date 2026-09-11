import { getDatabase } from "../config/database.js";
import { User } from "../types/user.model.js";

function getUsers() {
    return getDatabase().collection<User>("users");
}

export async function findUserByUsername(username: string | string[]) {
    return getUsers().findOne({ username });
}

export async function findUser(username: string, password: string){
    return getUsers().findOne({ username, password });
}

export async function getAllUsers(){
    return getUsers().find().toArray();
}

export async function createUser(user: Omit<User, "_id">): Promise<User> {
    const result = await getUsers().insertOne(user);
    return {
        ...user,
        _id: result.insertedId,
    };
}