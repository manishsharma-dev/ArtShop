const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Config = require("../models/config");
const artistSchema = new Schema({
    userId: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("Artist", artistSchema);