const express = require("express");
const {
  createTeacher,
  getAllTeachers,
  getSingleTecher,
  teacherPhoto,
  updateTeacher,
  deleteTeacher,
  teacherCategory,
  loginTeacher,
  testTeacherController,
  getPosts,
} = require("../controllers/teacherController");
const { requireSignIn, isAdmin } = require("../middlewares/authMiddleware");
const multer = require("../middlewares/multer");

const router = express.Router();

// CreateRoute
router.post(
  "/create",
  requireSignIn,
  isAdmin,
  multer.single("image"),
  createTeacher
);

// LoginRoute
router.post("/login", loginTeacher);

//testRoutes
router.get("/test", testTeacherController);

//testRoutes
router.get("/getPosts", getPosts);

//protected Admin route auth
router.get("/admin-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

// GetTeachers
router.get("/getAll", getAllTeachers);

// GetSingleTeacher
router.get("/getSingle/:slug", getSingleTecher);

// UpdateSingleTeacher
router.put("/updateSingle/:id", multer.single("image"), updateTeacher);

// DeleteSingleTeacher
router.delete("/deleteSingle/:id", deleteTeacher);

//category wise student
router.get("/teacher-category/:slug", teacherCategory);

module.exports = router;
