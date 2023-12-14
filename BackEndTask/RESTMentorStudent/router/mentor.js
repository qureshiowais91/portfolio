import express from "express";
const router = express.Router();
import { mentor, createMentor, addStudentToMentor, listofStudentByMentor } from "../controller/mentorController.js";
import { asyncHandler } from "../util/asyncHandler.js";

router.get('/list', asyncHandler(mentor));
router.post('/create', asyncHandler(createMentor));
router.post('/assignStudents', asyncHandler(addStudentToMentor));
router.post('/listStudentByMentor', asyncHandler(listofStudentByMentor));

export { router };