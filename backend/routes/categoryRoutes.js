const express = require('express')
const router = express.Router()
var {addCategory, getCoursesByCategory, getAllCategories, getCategoryNameById} = require("../controllers/categoryController.js")

const verifyToken = require("../middleware/authJWT.js");

router.post('/add-category', verifyToken, addCategory);
router.get('/courses-by-category/:id', getCoursesByCategory);
router.get('/all-categories', getAllCategories);
router.get('/category-name/:id', getCategoryNameById);


module.exports = router;