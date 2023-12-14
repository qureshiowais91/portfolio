import { ErrorResolver } from "../util/ErrorResolver.js";
import { Mentor } from "../model/mentor.js";

async function mentor(req, res) {
    res.status(200).json({ data: "server working" });
    next();
}

/**
 *Create Mentor WithOut any Relationship
@param {String} name
@param {Array} expertise 
@return {Response Object of Mentor || ErrorMessage,Status Code}
*/
async function createMentor(req, res, next) {
    const { name, expertise } = req.body;
    const newMentor = new Mentor({
        name,
        expertise
    });
    const resp = await newMentor.save();
    res.status(201).json(resp);
}

// Select one mentor and Add multiple Student
/**
 * 
 @param {import("mongoose").ObjectId} ObjectId // Object id of Mentor
 @param {Array} assignedStudents // Array of Stuent Object id to Add in Mentor Object 
 */
async function addStudentToMentor(req, res, next) {
    const { mentorId, assignedStudents } = req.body;
    const updatedMentor = await Mentor.findByIdAndUpdate(
        mentorId, // Mentor ID to update
        { $addToSet: { assignedStudents: { $each: assignedStudents } } }, // Update: Add students to the assignedStudents array
        { new: true } // To return the updated document
    );

    if (!updatedMentor) {
        throw new ErrorResolver(304, 'Mentor not Updated'); // Handle if mentor not found
    }
    res.status(201).json(updatedMentor);
}

// Write API to show all students for a particular mentor
async function listofStudentByMentor(req, res, next) {
    const { mentorId } = req.body;
    const studentList = await Mentor.findById(mentorId).populate('assignedStudents');


    if (!studentList) {
        throw new ErrorResolver(304, 'Mentor not Updated'); // Handle if mentor not found
    }
    res.status(201).json(studentList);
}

export { mentor, createMentor, addStudentToMentor, listofStudentByMentor }