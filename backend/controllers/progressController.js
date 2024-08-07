var ProgressModel = require("../models/progressModel")
var CourseModel = require("../models/courseModel.js")
var SectionModel = require("../models/sectionModel.js")



// Get the status of each lesson in a specific course
exports.getProgressForUserAndCourse = async (req, res) => {
      try {
            const userId = req.body.userId
            const courseId = req.body.courseId
            const progressObjects = await ProgressModel.find({ userId: userId, courseId: courseId })
            if(!progressObjects) {
                  console.log("No progressObjects with given userId and courseId");
            }
            // console.log(userId);
            // console.log(courseId);
            // console.log(progressObjects);
            res.status(200).send({progressObjects});
      } catch (err) {
            res.status(532).send({
                message: err.message
            });
      }
}



exports.updateProgressOfLessonOnClick = async (req, res) => {
      try {
            const userId = req.body.userId
            const courseId = req.body.courseId
            const sectionNumber = req.body.sectionNumber
            const lessonNumber = req.body.lessonNumber
            const progressObject = await ProgressModel.findOne({ userId, courseId, sectionNumber });
            
            // console.log(progressObject)
            progressObject['lessons'][lessonNumber]['status'] = !progressObject['lessons'][lessonNumber]['status']
            await progressObject.save();
            const progressObjects = await ProgressModel.find({ userId: userId, courseId: courseId })
            // console.log(progressObject)
            res.status(200).send({progressObjects});

      } catch (err) {
            res.status(555).send({
                message: err.message
            });
      }
}




exports.addProgressOnPurchase = async (req, res) => {
      try {
          const userId = req.body.userId;
          const courseId = req.body.courseId;
  
          // Retrieve the course details to determine the number of sections
          const course = await CourseModel.findById(courseId);
          if (!course) {
              return res.status(404).send({ message: 'Course not found' });
          }
          const sections = await SectionModel.find({courseId: courseId})
          // Create progress objects for each section of the course
          const progressObjects = sections.map((section, index) => {
              return {
                  userId: userId,
                  courseId: courseId,
                  sectionNumber: index + 1, // Section numbers start from 1
                  lessons: section.lessons.map(lesson => ({
                      lessonNumber: lesson.lessonNumber,
                      status: false // Default status is false for lessons not completed
                  }))
              };
          });
  
          // Save the progress objects to the database
          const progressStatus = await ProgressModel.insertMany(progressObjects);
          // const proObjects = await ProgressModel.find({courseId: courseId, userId: userId})
  
          res.status(200).send({ message: 'Progress objects added successfully', progressStatus: progressStatus });
      } catch (err) {
          res.status(500).send({ message: err.message });
      }
  };