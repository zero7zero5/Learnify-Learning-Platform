const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (req.body.description) {
      cb(null, "uploads/course_media/thumbnails");
    } else if (req.body.lessonNumber) {
      cb(null, "uploads/course_media/course_videos");
    }
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

module.exports = storage;
