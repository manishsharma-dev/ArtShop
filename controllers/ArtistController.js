const User = require("../models/UserModel");
const PasswordController = require("../controllers/PasswordController");
const Artist = require("../models/artist");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const apiResponse = require("../helpers/apiResponse");
const get_artists = catchAsyncErrors(async (req, res, next) => {

})

const get_artist_by_id = catchAsyncErrors(async (req, res, next) => {

});

const post_artist = catchAsyncErrors(async (req, res, next) => {
    const artist = new Artist(req.body);
    const newArtist = await artist.save();
    return apiResponse.successResponseWithData(res, "User created successfully", newArtist);
});

const update_artist = catchAsyncErrors(async (req, res, next) => {

});

const deactivate_artist = catchAsyncErrors(async (req, res, next) => {

});

module.exports = {
    get_artists,
    get_artist_by_id,
    post_artist,
    update_artist,
    deactivate_artist
};