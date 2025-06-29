const User = require("../models/UserModel");
const PasswordController = require("../controllers/PasswordController");
const { PasswordSave } = require("../helpers/PasswordSave");
const apiResponse = require("../helpers/apiResponse");
const { generateErrorMessage } = require("../helpers/GenerateErrorMessage");
const { getUserByParam } = require("../helpers/getUsersbyParamater");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const bcrypt = require("bcrypt");
const { request } = require("express");
const get_Users = (req, res) => {
  User.find()
    .populate("gender")
    .populate("country")
    .sort({ createdAt: -1 })
    .then((response) => {
      return apiResponse.successResponseWithData(res, null, response);
    })
    .catch((err) => {
      return apiResponse.ErrorResponse(res, generateErrorMessage(err));
    });
};

const get_UserbyId = async (req, res) => {
  const request = { _id: req.params.id };
  try {
    const user = await getUserByParam(request).catch((err) => {
      throw err;
    });
    return apiResponse.successResponseWithData(res, null, user);
  } catch (err) {
    return apiResponse.ErrorResponse(res, generateErrorMessage(err));
  }
};

const post_User = async (req, res) => {
  try {
    const saltRounds = parseInt(process.env.SALT_ROUNDS || "10", 10);
    const salt = await bcrypt.hash(
      `${req.body.email}_${Math.random().toString(36).substring(2, 10)}`,
      saltRounds
    );

    const encryptionKeyHint = `${Math.random().toString(36).substring(2, 10)}`;
    req.body["salt"] = salt;
    req.body["encryptionKeyHint"] = encryptionKeyHint;
    const user = new User(req.body);
    const newUser = await user.save().catch((err) => {
      throw err;
    });
    if (req.body.password) {
      await PasswordSave({
        userId: newUser._id,
        password: req.body.password,
      }).catch((err) => {
        throw err;
      });
    }
    // .then((response) => {
    return apiResponse.successResponseWithData(
      res,
      "User created successfully",
      newUser
    );
  } catch (err) {
    generateErrorMessage(err);
    return apiResponse.ErrorResponse(res, generateErrorMessage(err));
  }
};

const update_User = async (req, res) => {
  try {
    const { id } = req.params;
    User.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    }).then((response) => {
      if (!response) {
        return res.status(404).send({
          data: null,
          message: "User not found",
          err: null,
        });
      }
      res.send({
        data: response,
        message: "User updated successfully",
        err: null,
      });
    });
  } catch (err) {
    res.status(500).send({
      data: null,
      message: err.message,
      err: err,
    });
  }
};

module.exports = {
  get_Users,
  post_User,
  get_UserbyId,
  update_User,
};
