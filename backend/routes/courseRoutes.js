const express = require("express");
const router = express.Router();
const multer = require("multer");
const storage = require("../services/multer");
const verifyToken = require("../middleware/authJWT.js");
const upload = multer({ storage: storage });

const {
  getCourse,
  postCourse,
  getCourses,
  getCoursesBySearch,
  getInstructorCourse,
  getFeaturedCourses,
  getLessonCount,
} = require("../controllers/courseController.js");

router.post("/courses", verifyToken, upload.single("file"), postCourse);
router.get("/courses", getCourses);
router.get("/featured-courses", getFeaturedCourses);
router.get("/courses/search", getCoursesBySearch)
router.get("/courses/:id", getCourse);
router.get("/lesson-count/:id",getLessonCount)
router.get("/created-courses/:id", getInstructorCourse);


module.exports = router;
