const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const colors = require("colors");
const path = require("path");

const authRoutes = require("./routes/authRoute");

const teacherRoutes = require("./routes/teacherRoute");
const teacherGradeRoutes = require("./routes/teacherGradeRoute");

const studentRoutes = require("./routes/studentRoute");
const studentGradeRoutes = require("./routes/studentGradeRoute");

// Gender
const genderRoutes = require("./routes/genderRoute");

// Religion
const religionRoutes = require("./routes/religionRoute");

// National
const nationalRoutes = require("./routes/nationalRoute");

// Post
const postRoutes = require("./routes/postRoute");

// Subject
const subjectRoutes = require("./routes/subjectRoute");

const app = express();

dotenv.config();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// Static file
app.use(express.static(path.join(__dirname, "./client/build")));

// Auth Routes
app.use("/api/v1/auth", authRoutes);

app.use("/api/v1/teacher", teacherRoutes);
app.use("/api/v1/teacherGrade", teacherGradeRoutes);

app.use("/api/v1/student", studentRoutes);
app.use("/api/v1/studentGrade", studentGradeRoutes);

// Gender
app.use("/api/v1/gender", genderRoutes);

// Religion
app.use("/api/v1/religion", religionRoutes);

// National
app.use("/api/v1/national", nationalRoutes);

// Post
app.use("/api/v1/post", postRoutes);

// Subject
app.use("/api/v1/subject", subjectRoutes);

//PORT
const PORT = process.env.PORT || 8000;

// Database and Server running
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(
        `Server Running on ${process.env.DEV_MODE} mode on port ${PORT} && Database Connected`
          .bgCyan.white
      );
    });
  })
  .catch((error) => {
    console.log(error);
  });
