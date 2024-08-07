const mongoose = require("mongoose");

const sectionSchema = new mongoose.Schema({
  sectionNumber: {
    type: Number,
    required: true,
  },
  sectionName: {
    type: String,
    required: [true, "Title Not Provided"],
  },
  lessons: [
    {
      videoUrl: {
        type: String,
        required: [true, "Video URL not given"],
      },
      title: {
        type: String,
      },
      lessonNumber: {
        type: Number,
      },
      lessonLength: {
        type: String,
      },
      lessonDescription: {
        type: String,
      },
    },
  ],
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
  },
});

module.exports = mongoose.model("Section", sectionSchema);
