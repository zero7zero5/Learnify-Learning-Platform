var jwt = require("jsonwebtoken");
const argon2 = require("argon2");

var Instructor = require("../models/instructorModel");
exports.instructorSignup = async (req, res) => {
  const hashedPassword = await argon2.hash(req.body.password);
  const user = new Instructor({
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
    password: hashedPassword,
    aboutInstructor: req.body.aboutInstructor,
  });

  try {
    const userExists = await Instructor.findOne({ email: req.body.email });

    //check if user is already created or exists in db
    if (userExists) {
      res.status(409).send({ message: "Intructor already exists" });
      return;
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

exports.instructorSignin = async (req, res) => {
  try {
    const user = await Instructor.findOne({ email: req.body.email });

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

    res.status(200).send({
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
        courseCreated: user.courseCreated,
      },
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
