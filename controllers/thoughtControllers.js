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
    Thought.findOne({ _id: req.params.thoughtId })
      .then((thoughts) =>
        !thoughts
          ? res
              .status(404)
              .json({ message: "No thought could be found with that id" })
          : res.json(thoughts)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Create a new thought
  createThought(req, res) {
    Thought.create(req.body).then(({ _id }) => {
      return User.findOneAndUpdate(
        { username: req.body.id },
        { $push: { thoughts: _id } },
        { new: true }
      )
        .then((user) => {
          if (user) {
            res.json({
              message: "Your thought has been created successfully!",
            });
          } else {
            res.status(404).json({
              message: "There was an error when creating your thought",
            });
          }
        })
        .catch((err) => res.status(500).json(err));
    });
  },
  // Update an existing thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res
              .status(404)
              .json({ message: "No thought could be found with that id" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Delete an existing thought
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thoughts) =>
        !thoughts
          ? res
              .status(404)
              .json({ message: "No thought could be found with this id" })
          : User.findOneAndUpdate(
              { thoughts: req.params.thoughtId },
              { $pull: { thoughts: req.params.id } },
              { new: true }
            )
      )
      .then((user) =>
        !user
          ? res.status(404).json({
              message:
                "The thought has been deleted but no user could be found with that id",
            })
          : res.json({ message: "Thought has successfully been deleted" })
      )
      .catch((err) => res.status(500).json(err));
  },
  // Create a reaction
  createReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thoughts with that id" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Delete a reaction
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res
              .status(404)
              .json({ message: "No thought could be found with that id" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
};
