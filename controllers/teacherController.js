const teacherModel = require("../models/teacherModel");
const teacherGradeModel = require("../models/teacherGradeModel");
const cloudinary = require("../utils/cloudinary");
const slugify = require("slugify");
const JWT = require("jsonwebtoken");

// Create Teacher
exports.createTeacher = async (req, res) => {
  const {
    name,
    subject,
    phone,
    grade,
    gender,
    religion,
    national,
    fatherName,
    fatherNRC,
    address,
  } = req.body;
  const { file } = req;

  const newTeacher = new teacherModel({
    name,
    phone,
    subject,
    fatherName,
    fatherNRC,
    address,
    grade,
    gender,
    religion,
    national,
    slug: slugify(name),
  });

  try {
    if (file) {
      const { secure_url: url, public_id } = await cloudinary.uploader.upload(
        file.path
      );
      newTeacher.image = { url, public_id };
    }
  } catch (error) {
    console.log(error);
  }
  await newTeacher.save();

  res.json({
    post: {
      id: newTeacher._id,
      name,
      phone,
      subject,
      fatherName,
      fatherNRC,
      address,
      grade,
      gender,
      national,
      image: newTeacher.image?.url,
    },
  });
};

//Teacher LOGIN
exports.loginTeacher = async (req, res) => {
  try {
    const { phone } = req.body;
    //validation
    if (!phone) {
      return res.status(404).send({
        success: false,
        message: "Invalid User",
      });
    }
    //check user
    const user = await teacherModel
      .findOne({ phone })
      .populate("subject")
      .populate("grade")
      .populate("religion")
      .populate("gender")
      .populate("national");
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registerd",
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
        phone: user.phone,
        subject: user.subject,
        image: user.image,
        grade: user.grade,
        name: user.name,
        fatherName: user.fatherName,
        fatherNRC: user.fatherNRC,
        address: user.address,
        religion: user.religion,
        national: user.national,
        gender: user.gender,
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

//Test Teacher controller
exports.testTeacherController = (req, res) => {
  try {
    res.send("Protected Routes");
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
};

//get all Posts
exports.getPosts = async (req, res) => {
  try {
    const posts = await teacherModel.find({}).sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      message: "AllPosts ",
      posts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr in getting posts",
      error: error.message,
    });
  }
};

exports.getAllTeachers = async (req, res) => {
  try {
    let query = teacherModel
      .find()
      .populate("grade")
      .populate("subject")
      .populate("gender")
      .populate("religion")
      .populate("national")
      .sort({ createdAt: -1 });

    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.limit) || 6;
    const skip = (page - 1) * pageSize;
    const total = await teacherModel.countDocuments();

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

exports.getSingleTecher = async (req, res) => {
  try {
    const teacher = await teacherModel
      .findOne({ slug: req.params.slug })
      .populate("grade")
      .populate("subject")
      .populate("gender")
      .populate("religion")
      .populate("national");

    res.status(200).send({
      success: true,
      message: "Data fatched",
      teacher,
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

exports.updateTeacher = async (req, res) => {
  const {
    name,
    subject,
    phone,
    grade,
    gender,
    religion,
    national,
    fatherName,
    fatherNRC,
    address,
  } = req.body;
  const { file } = req;

  const post = await teacherModel.findById(req.params.id);
  if (!post) return res.status(404).json({ error: "Post not found!" });

  const public_id = post.image?.public_id;
  if (public_id && file) {
    const { result, error } = await cloudinary.uploader.destroy(public_id);

    if (result !== "ok")
      return res.status(404).json({ error: "Could not remove thumnail" });
  }

  if (file) {
    const { secure_url: url, public_id } = await cloudinary.uploader.upload(
      file.path
    );
    post.image = { url, public_id };
  }

  post.name = name;
  post.slug = slugify(name);
  post.subject = subject;
  post.grade = grade;
  post.gender = gender;
  post.religion = religion;
  post.national = national;
  post.phone = phone;
  post.fatherName = fatherName;
  post.fatherNRC = fatherNRC;
  post.address = address;

  await post.save();

  res.json({
    post: {
      id: post._id,
      name,
      subject,
      phone,
      fatherName,
      fatherNRC,
      address,
      grade,
      gender,
      religion,
      national,
      image: post.image?.url,
    },
  });
};

//delete controller
exports.deleteTeacher = async (req, res) => {
  try {
    const teacher = await teacherModel.findByIdAndDelete({
      _id: req.params.id,
    });
    res.status(200).send({ teacher });
  } catch (error) {
    res.status(500).send({ error });
  }
};

// get student by catgory
exports.teacherCategory = async (req, res) => {
  try {
    const grade = await teacherGradeModel.findOne({ slug: req.params.slug });
    const teachers = await teacherModel.find({ grade }).populate("grade");
    res.status(200).send({
      success: true,
      grade,
      teachers,
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
