const { User, Thought } = require("../models");

module.exports = {
  // Get all thoughts
  getAllThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  // Get single thought by id
  getThoughtById(req, res) {
    Thought.findOne({ _id: req.params.id })
      .then((thought) =>
        !thought
          ? res
              .status(404)
              .json({ message: "No thought could be found with that id" })
          : res.json(thoughts)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Create a new thought
  createThought(req, res) {
    Thought.create(req.body).then((thoughts) => {
      return User.findOneAndUpdate(
        { username: req.body.id },
        { $push: { thoughts: thoughts._id } },
        { new: true }
      )
        .then((user) => {
          if (user) {
            res.json({
              message: "Your thought has been created successfully!",
            });
          } else {
            res
              .status(404)
              .json({
                message: "There was an error when creating your thought",
              });
          }
        })
        .catch((err) => res.status(500).json(err));
    });
  },
};
