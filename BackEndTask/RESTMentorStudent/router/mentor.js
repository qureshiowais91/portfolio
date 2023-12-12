import express from "express";
const router = express.Router();
import { mentor } from "../controller/mentorController.js";
import { asyncHandler } from "../util/asyncHandler.js";

router.get('/list', asyncHandler(mentor));

export { router };