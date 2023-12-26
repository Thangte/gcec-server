const express = require("express");
const {
  createStudentGrade,
  getStudentGrade,
  updateStudentGrade,
  deleteStudentGrade,
} = require("../controllers/studentGradeController");

const router = express.Router();

// Create Grade
router.post("/create", createStudentGrade);

// Get Grades
router.get("/getAll", getStudentGrade);

// Update Grades
router.put("/updateSingle/:id", updateStudentGrade);

// Delete Grades
router.delete("/deleteSingle/:id", deleteStudentGrade);

module.exports = router;
