const studentModel = require("../models/studentModel");
const studentGradeModel = require("../models/studentGradeModel");
const slugify = require("slugify");
const JWT = require("jsonwebtoken");

// Create Student
exports.createStudent = async (req, res) => {
  try {
    const {
      studentId,
      teacher,
      grade,
      gender,
      subject,
      birth,
      engName,
      myanName,
      fatherName,
      fatherNRC,
      motherName,
      motherNRC,
      contact,
      address,
      // JulyExam
      JMyan,
      JEng,
      JMath,
      JGeo,
      JHis,
      JSci,
      JTotal,
      // OctoberExam
      OMyan,
      OEng,
      OMath,
      OGeo,
      OHis,
      OSci,
      OTotal,
      // DecemberExam
      DMyan,
      DEng,
      DMath,
      DGeo,
      DHis,
      DSci,
      DTotal,
      // FebruaryExam
      FMyan,
      FEng,
      FMath,
      FGeo,
      FHis,
      FSci,
      FTotal,
    } = req.body;

    //Validation
    switch (true) {
      case !studentId:
        return res.status(500).send({ error: "Id is Required" });
      case !teacher:
        return res.status(500).send({ error: "Teacher is Required" });
      case !grade:
        return res.status(500).send({ error: "Grade is Required" });
      case !gender:
        return res.status(500).send({ error: "Gender is Required" });
      case !engName:
        return res.status(500).send({ error: "English name is Required" });
      case !birth:
        return res.status(500).send({ error: "Birth name is Required" });
      case !myanName:
        return res.status(500).send({ error: "Myanmar name is Required" });
      case !contact:
        return res.status(500).send({ error: "Contact name is Required" });
      case !address:
        return res.status(500).send({ error: "address name is Required" });
    }

    const student = new studentModel({ ...req.body, slug: slugify(studentId) });

    await student.save();
    res.status(201).send({
      success: true,
      message: "Students Created Successfully",
      student,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in creating student",
    });
  }
};

//Student Login
exports.loginStudent = async (req, res) => {
  try {
    const { studentId } = req.body;
    //validation
    if (!studentId) {
      return res.status(404).send({
        success: false,
        message: "Invalid User",
      });
    }
    //check user
    const user = await studentModel
      .findOne({ studentId })
      .populate("grade")
      .populate("teacher");
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User is not registerd",
      });
    }

    //token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "login successfully",
      user: {
        _id: user._id,
        studentId: user.studentId,
        teacher: user.teacher,
        engName: user.engName,
        myanName: user.myanName,
        fatherName: user.fatherName,
        fatherNRC: user.fatherNRC,
        motherName: user.motherName,
        motherNRC: user.motherNRC,
        contact: user.contact,
        address: user.address,

        // July
        JMyan: user.JMyan,
        JEng: user.JEng,
        JMath: user.JMath,
        JGeo: user.JGeo,
        JHis: user.JHis,
        JSci: user.JSci,
        JTotal: user.JTotal,

        // October
        OMyan: user.OMyan,
        OEng: user.OEng,
        OMath: user.OMath,
        OGeo: user.OGeo,
        OHis: user.OHis,
        OSci: user.OSci,
        OTotal: user.OTotal,

        // December
        DMyan: user.DMyan,
        DEng: user.DEng,
        DMath: user.DMath,
        DGeo: user.DGeo,
        DHis: user.DHis,
        DSci: user.DSci,
        DTotal: user.DTotal,

        // February
        FMyan: user.FMyan,
        FEng: user.FEng,
        FMath: user.FMath,
        FGeo: user.FGeo,
        FHis: user.FHis,
        FSci: user.FSci,
        FTotal: user.FTotal,
      },

      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};

//Test Student controller
exports.testStudentController = (req, res) => {
  try {
    res.send("Protected Routes");
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
};

exports.getAllStudents = async (req, res) => {
  try {
    let query = studentModel
      .find()
      .populate("grade")
      .populate("gender")
      .sort({ createdAt: -1 });

    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * pageSize;
    const total = await studentModel.countDocuments();

    const pages = Math.ceil(total / pageSize);

    query = query.skip(skip).limit(pageSize);

    if (page > pages) {
      return res.status(404).json({
        status: "fail",
        message: "No page found",
      });
    }

    const result = await query;

    res.status(200).json({
      status: "success",
      count: result.length,
      page,
      pages,
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: "Server Error",
    });
  }
};

exports.getSingleStudent = async (req, res) => {
  try {
    const student = await studentModel
      .findOne({ slug: req.params.slug })
      .populate("grade")
      .populate("gender")
      .populate("teacher");
    res.status(200).send({
      success: true,
      message: "Data fatched",
      student,
    });
  } catch (error) {
    console.log(error),
      res.status(500).send({
        success: false,
        message: "Error getting data",
        error,
      });
  }
};

//upate student
exports.updateStudent = async (req, res) => {
  try {
    const {
      studentId,
      birth,
      grade,
      gender,
      teacher,
      engName,
      myanName,
      fatherName,
      fatherNRC,
      motherName,
      motherNRC,
      contact,
      address,
      // JulyExam
      JMyan,
      JEng,
      JMath,
      JGeo,
      JHis,
      JSci,
      JTotal,
      // OctoberExam
      OMyan,
      OEng,
      OMath,
      OGeo,
      OHis,
      OSci,
      OTotal,
      // DecemberExam
      DMyan,
      DEng,
      DMath,
      DGeo,
      DHis,
      DSci,
      DTotal,
      // FebruaryExam
      FMyan,
      FEng,
      FMath,
      FGeo,
      FHis,
      FSci,
      FTotal,
    } = req.body;

    const student = await studentModel.findByIdAndUpdate(
      req.params.pid,
      {
        studentId,
        birth,
        grade,
        gender,
        teacher,
        engName,
        myanName,
        fatherName,
        fatherNRC,
        motherName,
        motherNRC,
        contact,
        address,
        // JulyExam
        JMyan,
        JEng,
        JMath,
        JGeo,
        JHis,
        JSci,
        JTotal,
        // OctoberExam
        OMyan,
        OEng,
        OMath,
        OGeo,
        OHis,
        OSci,
        OTotal,
        // DecemberExam
        DMyan,
        DEng,
        DMath,
        DGeo,
        DHis,
        DSci,
        DTotal,
        // FebruaryExam
        FMyan,
        FEng,
        FMath,
        FGeo,
        FHis,
        FSci,
        FTotal,
        slug: slugify(studentId),
      },
      { new: true }
    );

    await student.save();
    res.status(201).send({
      success: true,
      message: "Student Updated Successfully",
      student,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Updte product",
    });
  }
};

//delete student
exports.deleteStudent = async (req, res) => {
  try {
    const student = await studentModel.findByIdAndDelete({
      _id: req.params.id,
    });
    res.status(200).send({ student });
  } catch (error) {
    res.status(500).send({ error });
  }
};

// search student
exports.searchStudent = async (req, res) => {
  try {
    const { keyword } = req.params;
    const resutls = await studentModel
      .find({
        $or: [
          { engName: { $regex: keyword, $options: "i" } },
          { studentId: { $regex: keyword, $options: "i" } },
        ],
      })
      .populate("grade");
    res.json(resutls);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error In Search Student API",
      error,
    });
  }
};

// get student by catgory
exports.studentCategory = async (req, res) => {
  try {
    const grade = await studentGradeModel.findOne({ slug: req.params.slug });
    const students = await studentModel.find({ grade }).populate("grade");
    res.status(200).send({
      success: true,
      grade,
      students,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      error,
      message: "Error While Getting products",
    });
  }
};

exports.getGradeStudent = async (req, res) => {
  try {
    const grade = await studentGradeModel.findOne({ slug: req.params.slug });
    let query = studentModel
      .find({ grade })
      .populate("grade")
      .sort({ createdAt: -1 });

    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * pageSize;
    const total = await studentModel.countDocuments();

    const pages = Math.ceil(total / pageSize);

    query = query.skip(skip).limit(pageSize);

    if (page > pages) {
      return res.status(404).json({
        status: "fail",
        message: "No page found",
      });
    }

    const result = await query;

    res.status(200).json({
      status: "success",
      count: result.length,
      page,
      pages,
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: "Server Error",
    });
  }
};
