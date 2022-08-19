const { User, Thought } = require("../models");

module.exports = {
  // Get all users
  getAllUsers(req, res) {
    User.find()
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  // Get a single user by ID
  getUserById(req, res) {
    User.findOne({ _id: req.params.id })
      .populate("friends")
      .populate("thoughts")
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: "No user could be found with that id" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Update a user
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: "No user could be found with that id" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Delete a user
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.id })
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: "No user could be found with that id" })
          : Thought.deleteMany({ _id: { $in: user.thoughts } })
      )
      .then(() =>
        res.json({ message: "The user and thoughts have been deleted" })
      )
      .catch((err) => res.status(500).json(err));
  },
  // Add a friend
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.id },
      { $addToSet: { friends: req.params.friendsId } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: "No user could be found with that id" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Delete a friend
  deleteFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.id },
      { $pull: { friends: req.params.friendsId } },
      { new: true }
    )
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: "No user could be found with this id" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
};
