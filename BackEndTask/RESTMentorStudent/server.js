import express from "express";
import dotenv from "dotenv";
import * as mentor from "./router/mentor.js"
import * as student from "./router/student.js"
import { connectDB } from "./util/connectDB.js";
import { errorHandler } from "./middleware/errorHandler.js";

dotenv.config();

const app = express();
connectDB()
app.use(express.json())
app.use("/mentor", mentor.router);
app.use("/student", student.router);
app.use(errorHandler);

app.listen(3000, () => {
  console.log("connected");
})