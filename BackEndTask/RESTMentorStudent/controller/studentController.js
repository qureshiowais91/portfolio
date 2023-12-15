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
    const newStudent = new Student({
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

        const { studentId, assignedMentor } = req.body;

        const student = await Student.findById(studentId);

        if (!student) {
            throw new ErrorResolver(404, 'Student not found');
        }

        let updateStudent;

        if (student.assignedMentor === undefined) {
            // Update assignedMentor if it's undefined
            updateStudent = await Student.findByIdAndUpdate(
                studentId,
                { $set: { assignedMentor } },
                { new: true }
            );
        } else {
            // Update assignedMentor and lastMentor separately
            updateStudent = await Student.findByIdAndUpdate(
                studentId,
                {
                    $set: {
                        assignedMentor,
                        lastMentor: student.assignedMentor,
                    },
                },
                { new: true }
            );
        }

        if (!updateStudent) {
            throw new ErrorResolver(304, 'Student not Updated');
        }

        res.status(201).json({ updateStudent });
    
}

async function listMentorByStudent(req, res, next) {
    const { studentId } = req.body;
    const mentorList = await Student.findById(studentId).populate('assignedMentors');
    if (!mentorList) {
        throw new ErrorResolver(304, 'Mentor not Updated'); // Handle if mentor not found
    }
    res.status(201).json(mentorList);
}

export { student, createStudent, addMentorToStudent, listMentorByStudent }