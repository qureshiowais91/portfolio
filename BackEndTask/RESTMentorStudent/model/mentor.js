import { Schema, model } from 'mongoose';

const mentorSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  expertise: [{
    type: String,
    required: true
  }],
  assignedStudents: [{
    type: Schema.Types.ObjectId,
    ref: 'Student'
  }]
});

const Mentor = model('Mentor', mentorSchema);

export { Mentor };