import { createApp } from "../src/config/app.js";
import "dotenv/config";
import router from "./routers/index.js";
import { mongoConnect } from "./config/database.js";

const PORT = process.env.PORT || 3000;
const SERVER = process.env.SERVER_NAME || "Buddy Services";

const instance = createApp();

mongoConnect();

instance.use("/api", router);

instance.listen(PORT, () => {
    console.log(`${SERVER} Server running on port ${PORT}`);
});

instance.get("/", (req, res) => {
    res.send(`${process.env.SERVER_NAME} is Running`);
});