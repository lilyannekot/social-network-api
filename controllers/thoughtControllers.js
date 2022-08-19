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
  //
};
