const express = require("express");
const {
  createSubject,
  getSubjects,
  updateSubject,
  deleteSubject,
} = require("../controllers/subjectController");

const router = express.Router();

// Create Grade
router.post("/create", createSubject);

// Get Grades
router.get("/getAll", getSubjects);

// Update Grades
router.put("/updateSingle/:id", updateSubject);

// Delete Grades
router.delete("/deleteSingle/:id", deleteSubject);

module.exports = router;
