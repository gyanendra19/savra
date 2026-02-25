import express from "express";
import {
  createActivity,
  createManyActivities,
  getActivitiesByTeacher,
  getActivityById,
  getAllActivities,
} from "../controllers/activityController.js";

const router = express.Router();

router.post("/", createActivity);
router.post("/bulk", createManyActivities);
router.get("/", getAllActivities);
router.get("/teacher/:teacherId", getActivitiesByTeacher);
router.get("/:id", getActivityById);

export default router;
