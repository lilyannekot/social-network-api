const { model, Schema, Types, trusted } = require("mongoose");
const moment = require("moment");

// Thought Schema
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

// Reaction Schema
const reactionSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
  },
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
  },
  {
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
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
      getters: trusted,
    },
    id: false,
  }
);

// Total count of reactions
thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.lengths;
});

// Create Thought model through thoughtSchema
const Thought = model("Thought", thoughtSchema);

module.exports = Thought;
