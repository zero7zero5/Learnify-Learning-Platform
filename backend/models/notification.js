const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, require: true },
  courseId: { type: mongoose.Schema.Types.ObjectId, required: true },
  title: { type: String, require: true },
  type: { type: Number, required: true },
  read: { type: Boolean, default: false },
  approve: { type: Boolean, default: false },
  time: { type: Date, default: Date.now() },
});
module.exports = mongoose.model("Notification", notificationSchema);
