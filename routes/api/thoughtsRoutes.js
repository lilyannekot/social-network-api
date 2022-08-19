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
  .delete(deleteThought);

// Create a reaction
router.route("/:thoughtId/reactions").post(createReaction);

// Delete a reaction by id
router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);

module.exports = router;
