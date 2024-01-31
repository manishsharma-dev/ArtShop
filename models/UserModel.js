const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken');
const UserSchema = new Schema({
    name: {
        required: true,
        type: String
    },
    email: {
        required: true,
        unique: true,
        type: String
    },
    mobile: {
        type: String
    },
    userType: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserType'
    }
});

UserSchema.methods.getJwtToken = function () {
    return jwt.sign({ email: this.email },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN })
}


module.exports = mongoose.model("User", UserSchema);