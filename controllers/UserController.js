const User = require("../models/UserModel");
const PasswordController = require("../controllers/PasswordController");
const { PasswordSave } = require("../helpers/PasswordSave");
const apiResponse = require("../helpers/apiResponse");
const { generateErrorMessage } = require("../helpers/GenerateErrorMessage");
const { getUserByParam } = require("../helpers/getUsersbyParamater");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const get_Users = (req, res) => {
    User.find()
        .sort({ createdAt: -1 })
        .then((response) => {
            return apiResponse.successResponseWithData(res, null, response);
        })
        .catch((err) => {
            return apiResponse.ErrorResponse(res, generateErrorMessage(err));
        });
}

const get_UserbyId = async (req, res) => {
    const request = { _id: req.params.id };
    try {
        const user = await getUserByParam(request).catch((err) => { throw err });
        return apiResponse.successResponseWithData(res, null, user);
    }
    catch (err) {
        return apiResponse.ErrorResponse(res, generateErrorMessage(err));
    }
}

const post_User = async (req, res) => {
    try {
        const user = new User(req.body);
        const newUser = await user.save().catch((err) => { throw err });
        await PasswordSave({ userId: newUser._id, password: req.body.password }).catch((err) => { throw err });
        // .then((response) => {
        return apiResponse.successResponseWithData(res, "User created successfully", newUser);
    }
    catch (err) {
        generateErrorMessage(err);
        return apiResponse.ErrorResponse(res, generateErrorMessage(err));
    }
}

module.exports = {
    get_Users,
    post_User,
    get_UserbyId
};