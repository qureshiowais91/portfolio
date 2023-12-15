import { Schema, model } from 'mongoose';

const studentSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  assignedMentor: {
    type: Schema.Types.ObjectId,
    ref: 'Mentor'
  },
  lastMentor: {
    type: Schema.Types.ObjectId,
    ref: 'Mentor'
  }
});

const Student = model('Student', studentSchema);

export { Student };