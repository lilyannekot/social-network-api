const { User } = require("../models");

module.exports = {
  // Get all users
  getAllUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  // Get a single user by ID
  getUserById(req, res) {
    User.findOne({ _id: req.params.id })
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: "No user could be found with that id" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
};
