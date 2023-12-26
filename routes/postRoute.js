const express = require("express");
const {
  createPost,
  getAllPosts,
  deletePost,
  getPosts,
  getSinglePost,
} = require("../controllers/postController");
const multer = require("../middlewares/multer");

const router = express.Router();

// Create Post
router.post("/create", multer.single("image"), createPost);

// Get All Posts
router.get("/getPosts", getPosts);

// Get All Posts
router.get("/getAll", getAllPosts);

// Get Single Post
router.get("/getSinglePost/:slug", getSinglePost);

// Delete Post
router.delete("/delete/:id", deletePost);

module.exports = router;
