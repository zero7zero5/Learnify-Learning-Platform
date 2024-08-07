var jwt = require("jsonwebtoken");
const argon2 = require("argon2");
var User = require("../models/userModel");

var Instructor = require("../models/instructorModel");
exports.signup = async (req, res) => {
  const hashedPassword = await argon2.hash(req.body.password);
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
    password: hashedPassword,
  });

  try {
    const userExists = await User.findOne({ email: req.body.email });

    //check if user is already created or exists in db
    if (userExists) {
      res.status(409).send({ message: "User already exists" });
      return;
    }
    //check for instructor
    if (req.body.role === "instructor") {
      const existingTeacher = await Instructor.findOne({
        email: req.body.email,
      });
      console.log(existingTeacher);
      if (existingTeacher) return res.send("Email Already Exists").status(409);

      const teacher = new Instructor({
        name: req.body.name,
        email: req.body.email,
        courseCreated: [],
      });
      await teacher.save();
    }

    await user.save();

    res.status(200).send({
      message: "User registered Successfully",
    });
  } catch (err) {
    res.status(500).send({
      message: err,
    });
    return;
  }
};

exports.signin = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).send({
        message: "User Not Found.",
      });
    }

    var passwordIsValid = await argon2.verify(user.password, req.body.password);

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!",
      });
    }
    var token = jwt.sign(
      {
        id: user.id,
        name: user.name,
      },
      process.env.API_SECRET,
      {
        expiresIn: 864000,
      }
    );
    console.log(user);
    res.status(200).send({
      user,
      message: "Login successfull",
      accessToken: token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      message: err,
    });
  }
};
