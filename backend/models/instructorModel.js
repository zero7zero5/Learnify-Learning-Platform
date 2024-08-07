const mongoose = require("mongoose");

const instructorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is not provided"],
  },
  email: {
    type: String,
    unique: [true, "email already exists in database!"],
    lowercase: true,
    trim: true,
    required: [true, "email not provided"],
    validate: {
      validator: function (v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: "{VALUE} is not a valid email!",
    },
  },
  password: { type: String, required: true },
  aboutInstructor: {
    type: String,
    default: "",
  },
  courseCreated: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
  role: {
    type: String,
    default: "Instructor",
  },
});

module.exports = mongoose.model("Instructor", instructorSchema);
