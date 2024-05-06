const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
   
   
  },
  {
    timestamps: true, // This option adds createdAt and updatedAt fields
  }
);

const User = mongoose.model("user", userSchema);

module.exports = User;
