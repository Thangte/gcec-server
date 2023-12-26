const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    studentId: {
      type: String,
      required: true,
    },

    engName: {
      type: String,
      required: true,
    },

    birth: {
      type: String,
      required: true,
    },

    slug: {
      type: String,
      required: true,
    },

    grade: {
      type: mongoose.ObjectId,
      ref: "StudentGrade",
      required: true,
    },

    gender: {
      type: mongoose.ObjectId,
      ref: "Gender",
      required: true,
    },

    teacher: {
      type: mongoose.ObjectId,
      ref: "Teacher",
      required: true,
    },

    myanName: {
      type: String,
      required: true,
    },

    fatherName: {
      type: String,
    },
    fatherNRC: {
      type: String,
    },

    motherName: {
      type: String,
    },
    motherNRC: {
      type: String,
    },
    contact: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },

    // July Exam
    JMyan: {
      type: String,
    },
    JEng: {
      type: String,
    },
    JMath: {
      type: String,
    },
    JGeo: {
      type: String,
    },
    JHis: {
      type: String,
    },
    JSci: {
      type: String,
    },
    JTotal: {
      type: String,
    },

    // October Exam
    OMyan: {
      type: String,
    },
    OEng: {
      type: String,
    },
    OMath: {
      type: String,
    },
    OGeo: {
      type: String,
    },
    OHis: {
      type: String,
    },
    OSci: {
      type: String,
    },
    OTotal: {
      type: String,
    },

    // December Exam
    DMyan: {
      type: String,
    },
    DEng: {
      type: String,
    },
    DMath: {
      type: String,
    },
    DGeo: {
      type: String,
    },
    DHis: {
      type: String,
    },
    DSci: {
      type: String,
    },
    DTotal: {
      type: String,
    },

    // February Exam
    FMyan: {
      type: String,
    },
    FEng: {
      type: String,
    },
    FMath: {
      type: String,
    },
    FGeo: {
      type: String,
    },
    FHis: {
      type: String,
    },
    FSci: {
      type: String,
    },
    FTotal: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", studentSchema);
