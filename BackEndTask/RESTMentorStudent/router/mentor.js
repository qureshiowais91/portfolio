import express from "express";
const router = express.Router();
import { mentor, createMentor ,addStuentToMentor,listofStuentByMentor} from "../controller/mentorController.js";
import { asyncHandler } from "../util/asyncHandler.js";

router.get('/list', asyncHandler(mentor));
router.post('/create', asyncHandler(createMentor));
router.post('/assignStudents',asyncHandler(addStuentToMentor));
router.post('/listStudentByMentor',asyncHandler(listofStuentByMentor));

export { router };