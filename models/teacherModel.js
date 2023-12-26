const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    slug: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    fatherName: {
      type: String,
      required: true,
    },

    fatherNRC: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    subject: {
      type: mongoose.ObjectId,
      ref: "Subject",
      required: true,
    },

    grade: {
      type: mongoose.ObjectId,
      ref: "TeacherGrade",
      required: true,
    },

    gender: {
      type: mongoose.ObjectId,
      ref: "Gender",
      required: true,
    },

    religion: {
      type: mongoose.ObjectId,
      ref: "Religion",
      required: true,
    },

    national: {
      type: mongoose.ObjectId,
      ref: "National",
      required: true,
    },

    image: {
      type: Object,
      url: {
        type: URL,
      },

      public_id: {
        type: String,
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Teacher", teacherSchema);
