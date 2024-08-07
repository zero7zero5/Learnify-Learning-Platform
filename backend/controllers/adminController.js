const CourseModel = require("../models/courseModel");
const Instructor = require("../models/instructorModel");
const UserModel = require("../models/userModel");


exports.getCourses = async (req,res) => {
    try{
       const course = await CourseModel.find();
       res.status(200).json({course});
    }catch(err){
        res.status(500).send({
            message:"Cannot fetch course details"
        })
    }
    
}

exports.getInstructors = async (req,res) =>{
    try{
    
        const instructor = await Instructor.find();
        res.status(200).json({instructor});

    }catch(err){
         res.status(500).send({
            message:"Cannot fetch Instructor Details"
         })
    }
}

exports.getUsers = async (req,res) =>{
    try{
    
        const user = await UserModel.find({role:"user"});
        res.status(200).json({user});

    }catch(err){
         res.status(500).send({
            message:"Cannot fetch user Details"
         })
    }
}