const express = require('express')
const router = express.Router()

var {getCourses,getInstructors,getUsers} = require("../controllers/adminController")

//add verify token here
router.get('/courses',getCourses);
router.get('/instructors',getInstructors);
router.get('/users',getUsers);

module.exports = router;
