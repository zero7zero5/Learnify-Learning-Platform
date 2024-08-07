var userModel = require("../models/userModel");

exports.getUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await userModel.findById({ _id: id });
    if (!user) {
      return res.status(404).send("No User Found");
    }
    res.status(200).json({ user: user });
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

exports.addCourseToCart = async (req, res) => {
  try {
    const userId = req.body.userId;
    const courseId = req.body.courseId;

    // Find the user by userId
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the courseId already exists in the cart
    if (user.cart.includes(courseId)) {
      return res
        .status(400)
        .json({ message: "Course already exists in the cart" });
    }

    // Add the courseId to the cart
    user.cart.push(courseId);
    await user.save();

    res.status(200).json({
      user: user,
      message: `${courseId} has been added to the cart of user ${userId}`,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteFromCart = async (req, res) => {
  try {
    const userId = req.body.userId;
    const courseId = req.body.courseId;
    // Find the user by userId
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Check if the courseId exists in the cart
    const courseIndex = user.cart.indexOf(courseId);
    if (courseIndex === -1) {
      return res
        .status(400)
        .json({ message: "Course does not exist in the cart" });
    }
    // Remove the courseId from the cart
    user.cart.splice(courseIndex, 1);
    await user.save();
    res.status(200).json({
      user: user,
      message: `${courseId} has been removed from the cart of user ${userId}`,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get the user's cart
exports.getUserCart = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Find the user by userId
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ cart: user.cart });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getPurchasedCourses = async (req, res) => {
  try {
    const userId = req.params.userId;
    // Find the user by userId
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ purchasedCourses: user.purchasedCourse });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// add get cart items
