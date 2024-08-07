const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title not provided"],
  },
  description: {
    type: String,
  },
  instructorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Instructor",
  },
  categoryId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
  ],
  price: {
    type: Number,
    required: [true, "Price is not set"],
  },
  averageRating: {
    type: Number,
  },
  thumbnailUrl: {
    type: String,
    required: [true, "Thumbail URL is not set"],
  },
  approved: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("Course", courseSchema);
