const { videoPath } = require("../config/path");
const SectionModel = require("../models/sectionModel");

exports.addSection = async (req, res) => {
  const section = new SectionModel({
    sectionNumber: req.body.sectionNumber,
    sectionName: req.body.sectionName,
    lessons: [
      {
        title: req.body.title,
        lessonNumber: req.body.lessonNumber,
        lessonLength: req.body.lessonLength,
        lessonDescription: req.body.lessonDescription,
        videoUrl: `${videoPath}${req.file.filename}`,
      },
    ],
    courseId: req.body.courseId,
  });
  try {
    await section.save();
    res.send({ message: "section added successfully" }).status(200);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.getSection = async (req, res) => {
  //may add access token and instructor id for further validation
  const sectionnumber = req.params.sectionNumber;
  const courseid = req.params.id;

  // console.log(sectionnumber);
  // console.log(courseid);
  // const instructorId =req.body.instructorId;
  try {
    const section = await SectionModel.find({
      sectionNumber: sectionnumber,
      courseId: courseid,
    });

    //send it in json
    res.status(200).send(section);
  } catch (err) {
    res.status(500).send({
      message: "Error in fetching information",
    });
  }
};

exports.addLessons = async (req, res) => {
  const id = req.params.id;
  const section = await SectionModel.findById(id);

  if (!section) {
    res.status(404).send("section not found");
    return;
  }

  const lesson = {
    title: req.body.title,
    lessonNumber: req.body.lessonNumber,
    lessonLength: req.body.lessonLength,
    lessonDescription: req.body.lessonDescription,
    videoUrl: `${videoPath}${req.file.filename}`,
  };

  if (!section.lessons) section.lessons = [];

  const index = section.lessons.findIndex(
    (ele) => ele.lessonNumber == req.body.lessonNumber
  );

  if (index != -1) {
    section.lessons.splice(index, 1);
  }
  section.lessons.push(lesson);

  try {
    // await section.save();
    await SectionModel.findOneAndUpdate(
      { _id: id },
      { lessons: section.lessons }
    );
    res.send("lessons Added Successfully").status(200);
  } catch (err) {
    res.send(err.message).status(500);
  }
};

exports.getSectionsByCourseId = async (req, res) => {
  try {
    const courseId = req.params.id;
    const sections = await SectionModel.find({ courseId: courseId });
    res.status(200).json({ sections });
  } catch (err) {
    res.send(err.message).status(500);
  }
};

exports.deleteSection = async (req, res) => {
  try {
    const id = req.params.id;
    const section = await SectionModel.deleteOne({ _id: id });

    if (!section) {
      res.send("Error in deletion").status(500);
    }

    res.status(200).send("Deletion of section successfull");
  } catch (err) {
    res.send(err.message).status(500);
  }
};

exports.deleteLesson = async (req, res) => {
  try {
    const id = req.params.id;
    const lessonNumber = req.params.lessonNumber;
    const section = await SectionModel.findById(id);
    // console.log("yes");

    if (!section) {
      res.send("Error in deletion").status(500);
    }

    const index = section.lessons.findIndex(
      (ele) => ele.lessonNumber == lessonNumber
    );

    section.lessons.splice(index, 1);
    await SectionModel.findOneAndUpdate(
      { _id: id },
      { lessons: section.lessons }
    );

    res.status(200).send("Deletion of lesson successfull");
  } catch (err) {
    res.send(err.message).status(500);
  }
};
