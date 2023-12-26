const genderModel = require("../models/genderModel");
const slugify = require("slugify");

// Create Category
exports.createGenderController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(401).send({ message: "Name is required" });
    }
    const existingGender = await genderModel.findOne({ name });
    if (existingGender) {
      return res.status(200).send({
        success: true,
        message: "Gender Already Exists",
      });
    }
    const gender = await new genderModel({
      name,
      slug: slugify(name),
    }).save();
    res.status(201).send({
      success: true,
      message: "new gender created",
      gender,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Gender",
    });
  }
};

// get all cat
exports.genderControlller = async (req, res) => {
  try {
    const gender = await genderModel.find({});
    res.status(200).send({
      success: true,
      message: "All Gender List",
      gender,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting all categories",
    });
  }
};
