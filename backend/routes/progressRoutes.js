const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authJWT.js");
var {getProgressForUserAndCourse, updateProgressOfLessonOnClick, addProgressOnPurchase} = require("../controllers/progressController.js")


router.post("/progress-lesson", verifyToken, getProgressForUserAndCourse);
router.put("/progress-lesson", verifyToken, updateProgressOfLessonOnClick);
router.post("/progress-course", verifyToken, addProgressOnPurchase);

module.exports = router;