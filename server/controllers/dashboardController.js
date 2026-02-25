import { Activity } from "../models/activityModel.js";
import mongoose from "mongoose";

// overall view
export const getDashboardOverview = async (req, res) => {
  try {
    const result = await Activity.aggregate([
      {
        $lookup: {
          from: "teachers",
          localField: "teacher",
          foreignField: "_id",
          as: "teacherInfo",
        },
      },
      { $unwind: "$teacherInfo" },

      {
        $group: {
          _id: "$teacher",
          teacherName: { $first: "$teacherInfo.name" },

          lessons: {
            $sum: {
              $cond: [{ $eq: ["$activityType", "lesson"] }, 1, 0],
            },
          },
          quizzes: {
            $sum: {
              $cond: [{ $eq: ["$activityType", "quiz"] }, 1, 0],
            },
          },
          assessments: {
            $sum: {
              $cond: [{ $eq: ["$activityType", "assessment"] }, 1, 0],
            },
          },
          totalActivities: { $sum: 1 },
        },
      },

      { $sort: { teacherName: 1 } },
    ]);

    res.json(result);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch dashboard overview",
      error: error.message,
    });
  }
};

// week by week trend
export const getWeeklyTrend = async (req, res) => {
  try {
    const result = await Activity.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            week: { $week: "$createdAt" },
          },
          totalActivities: { $sum: 1 },
        },
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.week": 1,
        },
      },
      {
        $project: {
          _id: 0,
          year: "$_id.year",
          week: "$_id.week",
          totalActivities: 1,
        },
      },
    ]);

    res.json(result);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch weekly trend",
      error: error.message,
    });
  }
};

// each teacher analytics
export const getTeacherAnalytics = async (req, res) => {
  try {
    const teacherId = new mongoose.Types.ObjectId(req.params.teacherId);

    const result = await Activity.aggregate([
      {
        $match: {
          teacher: teacherId,
        },
      },
      {
        $group: {
          _id: "$teacher",

          lessons: {
            $sum: {
              $cond: [{ $eq: ["$activityType", "lesson"] }, 1, 0],
            },
          },
          quizzes: {
            $sum: {
              $cond: [{ $eq: ["$activityType", "quiz"] }, 1, 0],
            },
          },
          assessments: {
            $sum: {
              $cond: [{ $eq: ["$activityType", "assessment"] }, 1, 0],
            },
          },
          totalActivities: { $sum: 1 },
        },
      },
    ]);

    res.json(result[0] || {});
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch teacher analytics",
      error: error.message,
    });
  }
};
