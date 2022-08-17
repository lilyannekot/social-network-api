const router = require("express").Router();

const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
} = require("../../controllers/userControllers.js");

// GET all users and POST users /api/users
router.route("/").get(getAllUsers).post(createUser);

router.route("/:id").get;
