const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authJWT.js");
var {getAllNotifications, approveNotification} = require("../controllers/notificationController.js")

router.get("/get-all-notifications", verifyToken, getAllNotifications);
router.post("/approve-notification/:id", verifyToken, approveNotification);



module.exports = router;