const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name : {
        required : true,
        unique : true,
        type: String
    },
    email : {
        required : true,
        unique : true,
        type: String
    },
    mobile : {
        required : true,
        unique : true,
        type: String
    },
    userType : {
        required : true,        
        type: String
    }
});


module.exports = mongoose.model("User", UserSchema);