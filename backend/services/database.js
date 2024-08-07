const mongoose = require("mongoose");
require("dotenv").config();

try {
    mongoose.connect(process.env.MONGO_DB_URI);
    console.log("Connected to Db");
  } catch (error) {
    console.log("Unhandled Rejection", error.message);
    process.exit(0);
  }
  