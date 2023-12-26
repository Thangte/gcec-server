const express = require("express");
const {
  createReligionController,
  getReligionControlller,
} = require("../controllers/religionController");

const router = express.Router();

// Create Religion
router.post("/create", createReligionController);

//getALl Religion
router.get("/getAll", getReligionControlller);

module.exports = router;
