const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
  },

  slug: {
    type: String,
    lowercase: true,
  },
});

module.exports = mongoose.model("Subject", subjectSchema);
