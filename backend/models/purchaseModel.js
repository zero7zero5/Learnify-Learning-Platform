const mongoose = require("mongoose");

const purchase = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
});

module.exports = mongoose.model("Purchase", purchase);
