const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name : {
        required : true,
        type: String
    },
    email : {
        required : true,
        unique : true,
        type: String
    },
    mobile : {                
        type: String
    },
    userType : {
        required : true,        
        type: mongoose.Schema.Types.ObjectId,
        ref : 'UserType'
    }
});


module.exports = mongoose.model("User", UserSchema);