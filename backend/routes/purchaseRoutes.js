const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authJWT.js");
var {
  purchaseCourse,
  purchasedCourse,
} = require("../controllers/purchaseController.js");

router.post("/purchase-course", verifyToken, purchaseCourse);
router.get("/purchased-course/:id", verifyToken, purchasedCourse);

module.exports = router;
