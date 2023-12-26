const express = require("express");
const {
  createStudent,
  getAllStudents,
  getSingleStudent,
  updateStudent,
  deleteStudent,
  searchStudent,
  studentCategory,
  getGradeStudent,
  loginStudent,
  testStudentController,
} = require("../controllers/studentController");
const { requireSignIn } = require("../middlewares/authMiddleware");

const router = express.Router();

// Create Route
router.post("/create", createStudent);

// LoginRoute
router.post("/login", loginStudent);

//testRoutes
router.get("/test", testStudentController);

//protected User route auth
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

// Get Students Route
router.get("/getAll", getAllStudents);

// GetSingleStudent Route
router.get("/getSingle/:slug", getSingleStudent);

//Update Students Route
router.put("/updateSingle/:pid", updateStudent);

//Delete Students Route
router.delete("/deleteSingle/:id", deleteStudent);

//search student
router.get("/search/:keyword", searchStudent);

//category wise student
router.get("/student-category/:slug", studentCategory);

//category wise student
router.get("/getGradeStudent/:slug", getGradeStudent);

module.exports = router;
