const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
require("../backend/services/database");

const userAuth = require("../backend/routes/userAuth");
const userRoute = require("../backend/routes/userRoutes");
const categoryRoutes = require("../backend/routes/categoryRoutes");
const courseRoutes = require("../backend/routes/courseRoutes");
const progressRoutes = require("../backend/routes/progressRoutes");
const purchaseRoutes = require("../backend/routes/purchaseRoutes");
const sectionRoutes = require("../backend/routes/sectionRoutes");
const adminRoutes = require("../backend/routes/adminRoutes");
const notoficationRoutes = require("../backend/routes/notificationRoutes");

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
app.use(notoficationRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
