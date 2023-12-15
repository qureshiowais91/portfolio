import express from "express";
const router = express.Router();
import { listMentorByStudent, student, addMentorToStudent, createStudent } from "../controller/studentController.js";
import { asyncHandler } from "../util/asyncHandler.js";

router.get('/list', asyncHandler(student));
router.post('/create', asyncHandler(createStudent));
router.post('/assignMentor', asyncHandler(addMentorToStudent));
router.post('/listMentorByStudent', asyncHandler(listMentorByStudent));

export { router };