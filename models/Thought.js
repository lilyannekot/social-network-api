const { model, Schema } = require("mongoose");
const moment = require("moment");
const reactionSchema = require("./Reaction");

const thoughtSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
  },
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
  },
  {
    reactions: [reactionSchema],
  },
  {
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) =>
        moment(createdAtVal).format("MMM DD, YYYY [at] hh:mm a"),
    },
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

// Retrieve length of thought's reactions
thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.lengths;
});

// Create Thought model through thoughtSchema
const Thought = model("Thought", thoughtSchema);

module.exports = Thought;
