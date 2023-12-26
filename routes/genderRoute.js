const express = require("express");
const {
  createGenderController,
  genderControlller,
} = require("../controllers/genderController");

const router = express.Router();

// Create Gender
router.post("/create", createGenderController);

//getALl Gender
router.get("/getAll", genderControlller);

module.exports = router;
