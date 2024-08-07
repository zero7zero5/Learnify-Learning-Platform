const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
require("./services/database");

const userAuth = require("./routes/userAuth");
const userRoute = require("./routes/userRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const courseRoutes = require("./routes/courseRoutes");
const progressRoutes = require("./routes/progressRoutes");
const purchaseRoutes = require("./routes/purchaseRoutes");
const sectionRoutes = require("./routes/sectionRoutes");
const adminRoutes = require("./routes/adminRoutes");
const notoficationRoutes = require("./routes/notificationRoutes")

const path = require("path");
const app = express();

// middlewares
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// routes
app.use(userAuth);
app.use(userRoute);
app.use(categoryRoutes);
app.use(courseRoutes);
app.use(progressRoutes);
app.use(purchaseRoutes);
app.use(sectionRoutes);
app.use(adminRoutes);
app.use(notoficationRoutes)

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
