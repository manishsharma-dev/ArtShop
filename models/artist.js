const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const artistSchema = new Schema({
    userId: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },   
    gender : String,
    dob : Date,
    country : String,
    expertise : String,
    })

    module.exports = mongoose.model("Artist", artistSchema);