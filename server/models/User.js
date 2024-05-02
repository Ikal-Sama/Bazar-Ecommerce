const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    mobile: {
      type: Number,
    },
    gender: String,
    address: String,
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    profilePhoto: {
      type: String,
      default: "https://cdn-icons-png.flaticon.com/128/1144/1144811.png",
    },
  },
  {
    timestamps: true,
  }
);

//Export the model
module.exports = mongoose.model("User", userSchema);
