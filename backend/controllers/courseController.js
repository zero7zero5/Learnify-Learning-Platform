const CourseModel = require("../models/courseModel");
const InstructorModel = require("../models/instructorModel");
const PurchaseModel = require("../models/purchaseModel");
const SectionModel = require("../models/sectionModel");

const path = require("../config/path");

exports.postCourse = async (req, res) => {
  const newCourse = new CourseModel({
    title: req.body.title,
    description: req.body.description,
    averageRating: req.body.averageRating,
    price: req.body.price,
    categoryId: req.body.categoryId,
    instructorId: req.body.instructorId,
    thumbnailUrl: `/uploads/course_media/thumbnails/${req.file.filename}`,
  });
  try {
    const course = await newCourse.save();
    const instructorId = req.body.instructorId;

    const info = await InstructorModel.findById(instructorId);
    info.courseCreated.push(course._id);

    await InstructorModel.findOneAndUpdate(
      { _id: instructorId },
      { courseCreated: info.courseCreated }
    );

    req.course = course;
    res
      .json({ message: "course added successfully", course: course })
      .status(200);
  } catch (err) {
    res.status(501).send({ error: err.message });
  }
};

exports.getCourse = async (req, res) => {
  const id = req.params.id;
  const course = await CourseModel.findById({ _id: id }).populate(
    "instructorId"
  );
  res.json({ course: course }).status(200);
  try {
  } catch (err) {
    res.status(502).send({ error: err.message });
  }
};

exports.getCourses = async (req, res) => {
  const courses = await CourseModel.find({});
  res.json({ courses: courses }).status(200);
  try {
  } catch (err) {
    res.status(503).send({ error: err.message });
  }
};

exports.getFeaturedCourses = async (req, res) => {
  //defines the number of featured courses that will be displayed
  const count = 3;

  //only courses with min of 1 purchase is going to be displayed under featured section
  const topPurchase = await PurchaseModel.aggregate([
    { $sortByCount: "$courseId" },
    { $limit: count },
  ]);

  let courses = [];

  for (let p of topPurchase) {
    let temp = await CourseModel.findById(p._id);
    courses.push(temp);
  }
  res.json({ courses: courses }).status(200);
  try {
  } catch (err) {
    res.status(503).send({ error: err.message });
  }
};

exports.getLessonCount = async (req, res) => {
  const courseId = req.params.id;

  const courseLessons = await SectionModel.find({ courseId: courseId });
  const count = courseLessons ? courseLessons.length : 1;

  res.json({ lessons: count }).status(200);
  try {
  } catch (err) {
    res.status(503).send({ error: err.message });
  }
};

exports.getCoursesBySearch = async (req, res) => {
  try {
    const searchQuery = req.query.query;
    if (!searchQuery) {
      return res.status(400).json({ error: "Search query is missing" });
    }

    const courses = await CourseModel.find({
      $or: [
        { title: { $regex: new RegExp(searchQuery, "i") } },
        { description: { $regex: new RegExp(searchQuery, "i") } },
      ],
    });

    res.status(200).json({ courses });
  } catch (err) {
    console.error("Error in getCoursesBySearch:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getInstructorCourse = async (req, res) => {
  try {
    const id = req.params.id;
    const courses = await CourseModel.find({ instructorId: id });
    res.status(200).json({ courses });
  } catch (err) {
    console.error("Error in getIntrcutorCourse:", err);
  }
};
