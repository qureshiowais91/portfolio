import { ErrorResolver } from "../util/ErrorResolver.js";
import { Student } from "../model/student.js";

async function student(req, res) {
    res.status(200).json({ data: "server working" });
    next();
}

/**
 *Create Student WithOut any Relationship
@param {String} name
@return {Response Object of Student || ErrorMessage,Status Code}
*/
async function createStudent(req, res, next) {
    const { name } = req.body;
    const newStudent = new Mentor({
        name
    });
    const resp = await newStudent.save();
    res.status(201).json(resp);
}

// Select one Student and Add multiple Mentor
/**
 * 
 @param {import("mongoose").ObjectId} ObjectId // Object id of Student
 @param {Array} assignedMentors // Array of Mentor Object id to Add in Student Object 
 */
async function addMentorToStudent(req, res, next) {
    const { studentId, assignedMentors } = req.body;
    const updateStudent = await Student.findByIdAndUpdate(
        studentId, // Mentor ID to update
        { $addToSet: { assignedMentors: { $each: assignedMentors } } }, // Update: Add students to the assignedStudents array
        { new: true } // To return the updated document
    );

    if (!updateStudent) {
        throw new ErrorResolver(304, 'Student not Updated'); // Handle if mentor not found
    }
    res.status(201).json(updateStudent);
}

// Write API to show all Mentor for a particular Student
async function listMentorByStudent(req, res, next) {
    const { studentId } = req.body;
    const mentorList = await Student.findById(studentId).populate('assignedStudents');
    if (!mentorList) {
        throw new ErrorResolver(304, 'Mentor not Updated'); // Handle if mentor not found
    }
    res.status(201).json(mentorList);
}

export { student, createStudent, addMentorToStudent, listMentorByStudent }