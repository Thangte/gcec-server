const express = require("express");
const {
  registerController,
  loginController,
  testController,
  allUsers,
  updateUsers,
} = require("../controllers/authController");
const { requireSignIn, isAdmin } = require("../middlewares/authMiddleware");

const formidable = require("express-formidable");

const router = express.Router();

// RegisterRoute
router.post("/register", registerController);

// LoginRoute
router.post("/login", loginController);

// Get Users
router.get("/get-users", requireSignIn, allUsers, (req, res) => {
  res.status(200).send({ ok: true });
});

// Update Users
router.put("/update-user/:pid", requireSignIn, formidable(), updateUsers);

//testRoutes
router.get("/test", requireSignIn, isAdmin, testController);

//protected User route auth
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

//protected Admin route auth
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

module.exports = router;
