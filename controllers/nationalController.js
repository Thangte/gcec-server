const nationalModel = require("../models/nationalModel");
const slugify = require("slugify");

// Create Category
exports.createNationalController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(401).send({ message: "Name is required" });
    }
    const existingNational = await nationalModel.findOne({ name });
    if (existingNational) {
      return res.status(200).send({
        success: true,
        message: "National Already Exists",
      });
    }
    const national = await new nationalModel({
      name,
      slug: slugify(name),
    }).save();
    res.status(201).send({
      success: true,
      message: "new national created",
      national,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in National",
    });
  }
};

// get all cat
exports.getNationalControlller = async (req, res) => {
  try {
    const national = await nationalModel.find({});
    res.status(200).send({
      success: true,
      message: "All National List",
      national,
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
