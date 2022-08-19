const { model, Schema } = require("mongoose");
const moment = require("moment");

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
        getters: true,
      },
      id: false,
    }
  );


// Create Reaction model through thoughtSchema
const Reaction = model("Reaction", reactionSchema);

module.exports = Reaction;