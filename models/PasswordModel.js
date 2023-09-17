const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const PasswordSchema = new Schema({
  userId: {
    required: true,
    unique: true,
    type: mongoose.Schema.Types.ObjectId,
    ref : 'User'
  },
  password: {
    required: true,    
    type: String,
  }
});
module.exports = mongoose.model("Password", PasswordSchema);
