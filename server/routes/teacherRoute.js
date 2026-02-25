import express from "express";
import {
  createTeacher,
  createManyTeachers,
  getTeacherById,
} from "../controllers/teacherController.js";

const router = express.Router();

router.post("/", createTeacher);
router.post("/bulk", createManyTeachers);
router.get("/:id", getTeacherById);

export default router;
