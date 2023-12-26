const express = require("express");
const {
  createNationalController,
  getNationalControlller,
} = require("../controllers/nationalController");

const router = express.Router();

// Create Religion
router.post("/create", createNationalController);

//getALl Religion
router.get("/getAll", getNationalControlller);

module.exports = router;
