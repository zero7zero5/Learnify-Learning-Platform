var express = require("express");
var router = express.Router();
var { signin, signup } = require("../controllers/register.js");
const verifyToken = require("../middleware/authJWT.js");
const {
  instructorSignin,
  instructorSignup,
} = require("../controllers/instructorRegister.js");

router.post("/register", signup);
router.post("/login", signin);

router.post("/instructor-register", instructorSignup);
router.post("/instructor-login", instructorSignin);

router.post("/protectedContent", verifyToken, (req, res) => {
  res.send("Authorized");
});

module.exports = router;
