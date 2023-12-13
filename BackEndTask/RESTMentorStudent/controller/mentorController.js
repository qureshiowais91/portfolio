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
    const resp = await newMentor.save(newMentor);
    res.status(201).json(resp);
}

// Select one mentor and Add multiple Student
/**
 * 
 @param {import("mongoose").ObjectId} ObjectId // Object id of Mentor
 @param {Array} assignedStudents // Array of Stuent Object id to Add in Mentor Object 
 */
async function addStuentToMentor(req, res, next) {
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


async function listofStuentByMentor(req, res, next) {
    const { mentorId } = req.body;
    const studentList = await Mentor.findById(mentorId).populate('assignedStudents');


    if (!studentList) {
        throw new ErrorResolver(304, 'Mentor not Updated'); // Handle if mentor not found
    }
    res.status(201).json(studentList);
}


export { mentor, createMentor, addStuentToMentor,listofStuentByMentor }

// Write API to Assign a student to Mentor
// A student who has a mentor should not be shown in List
// Write API to Assign or Change Mentor for particular Student
// Select One Student and Assign one Mentor
// Write API to show all students for a particular mentor
// Write an API to show the previously assigned mentor for a particular student.