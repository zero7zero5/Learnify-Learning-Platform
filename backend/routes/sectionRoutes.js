const express = require("express");
const router = express.Router();
const multer = require("multer");
const verifyToken = require("../middleware/authJWT.js");
const {
  addSection,
  addLessons,
  getSectionsByCourseId,
  getSection,
  deleteLesson,
  deleteSection
} = require("../controllers/sectionController.js");
const storage = require("../services/multer");
const upload = multer({ storage: storage });

// router.post("/section", addSection);

//need to add verifyToken and other params if needed
router.get("/get-section/:id/:sectionNumber",getSection);

//lol did not check this route out
router.get("/section/:id", getSectionsByCourseId)
router.post("/section", upload.single("file"), addSection);
router.put("/section/:id",upload.single("file"), addLessons);
router.put("/section/:id", verifyToken, upload.single("file"), addLessons);
router.delete("/section/:id/:lessonNumber",deleteLesson);
router.delete("/section/:id",deleteSection);


module.exports = router;

