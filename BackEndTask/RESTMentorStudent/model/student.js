import { Schema, model } from 'mongoose';

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  assignedMentors: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Mentor'
  }]
});

const Student = mongoose.model('Student', studentSchema);

export { Student };