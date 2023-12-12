import express from "express";
import dotenv from "dotenv";
import * as mentor from "./router/mentor.js"
import { connectDB } from "./util/connectDB.js";

dotenv.config();

const app = express();
connectDB()

app.use("/mentor", mentor.router);

app.listen(3000, () => {
  console.log("connected");
})