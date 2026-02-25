import express from "express";
import {
  getDashboardOverview,
  getWeeklyTrend,
  getTeacherAnalytics,
} from "../controllers/dashboardController.js";

const router = express.Router();

router.get("/overview", getDashboardOverview);
router.get("/weekly", getWeeklyTrend);
router.get("/teacher/:teacherId", getTeacherAnalytics);

export default router;
