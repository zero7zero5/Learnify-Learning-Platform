var CategoryModel = require("../models/categoryModel");
const CourseModel = require("../models/courseModel");
const path = require("../config/path");

exports.addCategory = async (req, res) => {
  try {
    const newCategory = new CategoryModel({
      categoryName: req.body.categoryName,
    });
    await newCategory.save();

    res.status(200).send({
      message: "new category has been created and added to the database",
    });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

exports.getCoursesByCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const courses = await CourseModel.find({ categoryId: categoryId });
    res.status(200).send({ courses });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await CategoryModel.find();
    res.status(200).send({ categories });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

//To set the category names in the course preview page
exports.getCategoryNameById = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const categories = await CategoryModel.find({ _id: categoryId });
    res.status(200).send({ categories });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};
