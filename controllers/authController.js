const userModel = require("../models/userModel");
const { hashPassword, comparePassword } = require("../helpers/authHelper");
const JWT = require("jsonwebtoken");
const slugify = require("slugify");

// Register User
exports.registerController = async (req, res) => {
  try {
    const { name, password, phone } = req.body;
    //validations
    if (!name) {
      return res.send({ error: "Name is Required" });
    }
    if (!password) {
      return res.send({ message: "Password is Required" });
    }
    if (!phone) {
      return res.send({ message: "Phone no is Required" });
    }

    //check user
    const exisitingUser = await userModel.findOne({ name });
    //exisiting user
    if (exisitingUser) {
      return res.status(200).send({
        success: false,
        message: "Already Register please login",
      });
    }
    //register user
    const hashedPassword = await hashPassword(password);
    //save
    const user = await new userModel({
      name,
      phone,
      password: hashedPassword,
      slug: slugify(name),
    }).save();

    res.status(201).send({
      success: true,
      message: "Creating User Successful",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Errro in Registeration",
      error,
    });
  }
};

//POST LOGIN
exports.loginController = async (req, res) => {
  try {
    const { name, password } = req.body;
    //validation
    if (!name || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }
    //check user
    const user = await userModel.findOne({ name });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registerd",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
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
        name: user.name,
        phone: user.phone,
        role: user.role,
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

//Test controller
exports.testController = (req, res) => {
  try {
    res.send("Protected Routes");
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
};

// Get All Users
exports.allUsers = async (req, res) => {
  try {
    const getUsers = await userModel.find({});
    res.status(200).send({
      success: true,
      message: "All Users List",
      getUsers,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting all users",
    });
  }
};

//Upate Users
exports.updateUsers = async (req, res) => {
  try {
    const { name, phone, role } = req.fields;
    //Validation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !phone:
        return res.status(500).send({ error: "Phone is Required" });
      case !role:
        return res.status(500).send({ error: "Role is Required" });
    }

    const users = await userModel.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );

    await users.save();
    res.status(201).send({
      success: true,
      message: "Product Updated Successfully",
      users,
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
