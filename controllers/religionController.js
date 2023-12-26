const religionModel = require("../models/religionModel");
const slugify = require("slugify");

// Create Category
exports.createReligionController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(401).send({ message: "Name is required" });
    }
    const existingReligion = await religionModel.findOne({ name });
    if (existingReligion) {
      return res.status(200).send({
        success: true,
        message: "Religion Already Exists",
      });
    }
    const religion = await new religionModel({
      name,
      slug: slugify(name),
    }).save();
    res.status(201).send({
      success: true,
      message: "new religion created",
      religion,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Religion",
    });
  }
};

// get all cat
exports.getReligionControlller = async (req, res) => {
  try {
    const religion = await religionModel.find({});
    res.status(200).send({
      success: true,
      message: "All Religion List",
      religion,
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
