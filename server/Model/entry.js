const mongoose = require("mongoose");

const entrySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
    },
    voiceRecording: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "GridFS",
    },
    falseName: {
      type: String,
      required: true,
    },
    img: {
      type: String,
    },
    author: {
      type: String,
    },
  },
  {
    timestamps: true, // This option adds createdAt and updatedAt fields
  }
);

const Entry = mongoose.model("entry", entrySchema);

module.exports = Entry

