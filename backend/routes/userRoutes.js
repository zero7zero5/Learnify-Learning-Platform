const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authJWT.js");
const { getUser, addCourseToCart, deleteFromCart, getUserCart, getPurchasedCourses } = require("../controllers/userController.js");

router.get("/user/:id", verifyToken, getUser);
router.post("/user/add-to-cart", verifyToken, addCourseToCart)
router.delete("/user/delete-from-cart", verifyToken, deleteFromCart)
router.get('/user/cart/:userId', verifyToken, getUserCart);
router.get('/user/purchased-courses/:userId', verifyToken, getPurchasedCourses);

//optional
//router.get("/updateUser", verifyToken, updateUser);

module.exports = router;
