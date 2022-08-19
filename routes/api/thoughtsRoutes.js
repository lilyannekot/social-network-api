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
router.route("/").get(getAllThoughts).post(createThought);

router.route("/:id").get(getThoughtById).put(updateThought).delete(deletethought);
