import mongoose from "mongoose";

// activity schema
const activitySchema = new mongoose.Schema(
  {
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
      required: true,
    },

    activityType: {
      type: String,
      enum: ["lesson", "quiz", "assessment"],
      required: true,
    },

    subject: {
      type: String,
      required: true,
    },

    class: {
      type: String,
      required: true,
    },

    createdAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

// indexes for performance and uniqeness
activitySchema.index(
  { teacher: 1, activityType: 1, subject: 1, class: 1, createdAt: 1 },
  { unique: true },
);

export const Activity = mongoose.model("Activity", activitySchema);
