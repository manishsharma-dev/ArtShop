const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");
const ConfigValues = require("./configValues");
const UserSchema = new Schema({
  name: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    unique: true,
    type: String,
  },
  mobile: {
    type: String,
  },
  userType: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: "UserType",
  },
  gender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ConfigValues",
    required: [true, "Please select a gender"],
  },
  dob: {
    type: Date,
  },

  country: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ConfigValues",
    required: [true, "Please enter the country for artist"],
  },
  bio: {
    type: String,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  refreshToken: {
    type: String,
  },
  salt: {
    type: String,
    required: true,
    unique: true,
  },
  encryptionKeyHint: {
    type: String,
    //required: true,
    unique: true,
  },
});

UserSchema.methods.getJwtToken = function () {
  return jwt.sign({ email: this.email }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

UserSchema.methods.getRefreshToken = function () {
  return jwt.sign({ email: this.email }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
  });
};

module.exports = mongoose.model("User", UserSchema);
