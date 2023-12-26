const express = require("express");
const {
  createTeacherGrade,
  getTeacherGrade,
  updateTeacherGrade,
  deleteTeacherGrade,
} = require("../controllers/teacherGradeController");

const router = express.Router();

// Create Grade
router.post("/create", createTeacherGrade);

// Get Grades
router.get("/getAll", getTeacherGrade);

// Update Grades
router.put("/updateSingle/:id", updateTeacherGrade);

// Delete Grades
router.delete("/deleteSingle/:id", deleteTeacherGrade);

module.exports = router;
