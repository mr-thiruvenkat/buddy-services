import { MongoClient, Db } from "mongodb";

let db: Db;

export async function mongoConnect() {
    const mongoUri = process.env.MONGODB_URI;

    if (!mongoUri) {
        throw new Error("MONGODB_URI is not configured");
    }

    const client = new MongoClient(mongoUri);
    try {
        await client.connect();
        db = client.db();
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection failed");
        throw error;
    }
}

export function getDatabase(): Db {
    if (!db) {
        throw new Error("Database is not connected");
    }
    return db;
}