const router = require("express").Router();

const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  // deleteFriend,
} = require("../../controllers/userControllers.js");

// GET all users and POST users
router.route("/").get(getAllUsers).post(createUser);

// GET, PUT, and DELETE one user by id
router.route("/:id").get(getUserById).put(updateUser).delete(deleteUser);

// POST and DELETE a friend
router.route("/:id/friends/:friendsId").post(addFriend)
// .delete(deleteFriend);

module.exports = router;
