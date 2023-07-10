import dotenv from "dotenv";
import app from "./app";
import mongoose from "mongoose";

dotenv.config();

mongoose.connect(String(process.env.MONGO_URI));

const db = mongoose.connection;

db.on("error", () => console.log("Connection error"));

db.once("open", () => console.log("DB connected"));

const PORT = parseInt(`${process.env.PORT} || 3000`);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}.`));
