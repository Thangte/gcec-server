const mongoose = require("mongoose");

const religionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  slug: {
    type: String,
    lowercase: true,
  },
});

module.exports = mongoose.model("Religion", religionSchema);
