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

// Get all thoughts and create a new thought
router.route("/").get(getAllThoughts).post(createThought);

// Get, update, and delete a thought by id
router
  .route("/:id")
  .get(getThoughtById)
  .put(updateThought)
  .delete(deletethought);

// Create and delete reactions
router.route("/:thoughtId/reactions").post(createReaction);
