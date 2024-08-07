const mongoose = require("mongoose");

const user = new mongoose.Schema({
  name: { type: String, required: true },
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
  completedCourse: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Course", default: null },
  ],
  purchasedCourse: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Course", default: null },
  ],
  cart: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Course", default: null },
  ],
  role: { type: String, enum: ["admin", "user", "instructor"] },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", user);
