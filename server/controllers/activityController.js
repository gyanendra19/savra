import { Activity } from "../models/activityModel.js";
import { Teacher } from "../models/teacherModel.js";

// Create single activity
export const createActivity = async (req, res) => {
  try {
    const { teacherId } = req.body;

    const teacherExists = await Teacher.findById(teacherId);
    if (!teacherExists) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    const activity = await Activity.create({
      teacher: teacherId,
      activityType: req.body.activityType,
      subject: req.body.subject,
      class: req.body.className,
      createdAt: req.body.createdAt,
    });

    res.status(201).json(activity);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        message: "Duplicate activity detected",
      });
    }

    res.status(400).json({
      message: "Failed to create activity",
      error: error.message,
    });
  }
};

// Create multiple activities
export const createManyActivities = async (req, res) => {
  try {
    const activitiesData = req.body;

    const activities = await Activity.insertMany(activitiesData, {
      ordered: false,
    });

    res.status(201).json({
      message: "Activities inserted successfully",
      count: activities.length,
      activities,
    });
  } catch (error) {
    res.status(400).json({
      message: "Bulk activity insert failed",
      error: error.message,
    });
  }
};

// Get all activities
export const getAllActivities = async (req, res) => {
  try {
    const activities = await Activity.find()
      .populate("teacher", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      count: activities.length,
      activities,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch activities",
      error: error.message,
    });
  }
};

// Get activities by teacher ID
export const getActivitiesByTeacher = async (req, res) => {
  try {
    const activities = await Activity.find({
      teacher: req.params.teacherId,
    })
      .populate("teacher", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      count: activities.length,
      activities,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch teacher activities",
      error: error.message,
    });
  }
};

// Get single activity by ID
export const getActivityById = async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id).populate(
      "teacher",
      "name email",
    );

    if (!activity) {
      return res.status(404).json({ message: "Activity not found" });
    }

    res.status(200).json(activity);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch activity",
      error: error.message,
    });
  }
};
