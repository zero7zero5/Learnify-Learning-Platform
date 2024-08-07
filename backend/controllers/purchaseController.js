var PurchaseModel = require("../models/purchaseModel");
const UserModel = require("../models/userModel");
const SectionModel = require("../models/sectionModel");
const ProgressModel = require("../models/progressModel");

exports.purchaseCourse = async (req, res) => {
  try {
    const userId = req.body.userId; // Corrected to userId
    const courseId = req.body.courseId;

    //Checking whether the course exists
    const courseExists = await PurchaseModel.findOne({
      userId: userId,
      courseId: courseId,
    });
    if (courseExists) {
      return res.status(500).send({
        message: "Course Already Exists!",
      });
    } else {
      // add into the purchase database
      const newPurchase = new PurchaseModel({
        userId: userId, // Corrected to userId
        courseId: courseId,
      });
      await newPurchase.save();

      // update purchasedCourses field of the user
      const userToAddTo = await UserModel.findOne({ _id: userId }); // Corrected to _id
      if (!userToAddTo) {
        return res.status(404).send({
          message: "User not found",
        });
      }

      userToAddTo.purchasedCourse.push(courseId); // Assuming purchasedCourse is an array
      await userToAddTo.save();

      // adding to progress model
      const sections = await SectionModel.find({ courseId: courseId });
      for (let items of sections) {
        const section = new ProgressModel({
          userId: userId,
          courseId: courseId,
          sectionNumber: items.sectionNumber,
          lessons: items.lessons,
        });
        await section.save();
      }

      res.status(200).send({
        message:
          "New purchase has been created, added to the purchase collection, and added to the user collection",
      });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

exports.purchasedCourse = async (req, res) => {
  const id = req.params.id;

  try {
    const purchasedCourses = await PurchaseModel.find({ userId: id }).populate(
      "courseId"
    );
    res.status(200).send(purchasedCourses);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
