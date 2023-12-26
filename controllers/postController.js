const postModel = require("../models/postModel");
const slugify = require("slugify");
const cloudinary = require("../utils/cloudinary");

// Create Post
exports.createPost = async (req, res) => {
  const { title, description } = req.body;
  const { file } = req;

  const newPost = new postModel({
    title,
    slug: slugify(title),
    description,
  });

  try {
    if (file) {
      const { secure_url: url, public_id } = await cloudinary.uploader.upload(
        file.path
      );
      newPost.image = { url, public_id };
    }
  } catch (error) {
    console.log(error);
  }
  await newPost.save();

  res.json({
    post: {
      id: newPost._id,
      title,
      description,
      image: newPost.image?.url,
    },
  });
};

//get all Posts
exports.getPosts = async (req, res) => {
  try {
    const posts = await postModel.find({}).sort({ createdAt: -1 });
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

exports.getAllPosts = async (req, res) => {
  try {
    let query = postModel.find().sort({ createdAt: -1 });

    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.limit) || 6;
    const skip = (page - 1) * pageSize;
    const total = await postModel.countDocuments();

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

exports.getSinglePost = async (req, res) => {
  try {
    const post = await postModel.findOne({ slug: req.params.slug });

    res.status(200).send({
      success: true,
      message: "Data fatched",
      post,
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

//delete controller
exports.deletePost = async (req, res) => {
  try {
    const post = await postModel.findByIdAndDelete({
      _id: req.params.id,
    });
    res.status(200).send({ post });
  } catch (error) {
    res.status(500).send({ error });
  }
};
