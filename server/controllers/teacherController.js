import { Teacher } from "../models/teacherModel.js";

// Create single teacher
export const createTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.create(req.body);
    res.status(201).json(teacher);
  } catch (error) {
    res.status(400).json({
      message: "Failed to create teacher",
      error: error.message,
    });
  }
};

// Create multiple teachers at once
export const createManyTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.insertMany(req.body, {
      ordered: false,
    });

    res.status(201).json({
      message: "Teachers inserted successfully",
      count: teachers.length,
      teachers,
    });
  } catch (error) {
    res.status(400).json({
      message: "Bulk insert failed",
      error: error.message,
    });
  }
};

export const getTeacherById = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);

    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    res.status(200).json(teacher);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch teacher",
      error: error.message,
    });
  }
};
