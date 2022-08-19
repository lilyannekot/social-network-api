const router = require("express").Router();

const {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction,
} = require("../../controllers/thoughtControllers");

// Get all thoughts
router.route("/").get(getAllThoughts);

router.route("/:id").get(getThoughtById);
