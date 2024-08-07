const mongoose = require("mongoose");

const progress = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
  sectionNumber: {
    type: Number,
    required: true,
  },
  lessons: [
    {
      lessonNumber: { type: Number, required: true },
      status: { type: Boolean, default: false },
    },
  ],
});

module.exports = mongoose.model("Progress", progress);
