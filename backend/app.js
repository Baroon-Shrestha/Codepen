import dotenv from "dotenv";
import express from "express";
import { connectDB } from "./database/database.js";
import bodyParser from "body-parser";
import cors from "cors"
import userRoute from "./routes/userRoutes.js"
import codeRoute from "./routes/codeRoute.js"
import cookieParser from "cookie-parser";

export const app = express();

app.use(cors({
    // origin: true,
    origin: "https://codepen-clone-iota-gold.vercel.app",
    methods: ['GET', 'POST', 'DELETE', 'PUT'],
    credentials: true
}))

app.use(bodyParser.json())
app.use(cookieParser())

dotenv.config({ path: "./.env" })

app.use("/codepen", userRoute)
app.use("/codepen", codeRoute)

connectDB()

app.use("/", (req, res) => {
    console.log("request received");
    res.send("Request received successfully");
});


