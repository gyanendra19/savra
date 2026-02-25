import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    unique: true,
  },

  subject: {
    type: String,
  },
});

export const Teacher = mongoose.model("Teacher", teacherSchema);
