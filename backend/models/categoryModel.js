const mongoose = require("mongoose");

const category = new mongoose.Schema({
  categoryName: {
    type: String,
    required: [true, "Category name not provided"],
  },
});

module.exports = mongoose.model("Category", category);
