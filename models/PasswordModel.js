const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const PasswordSchema = new Schema({
  userId: {
    required: true,
    unique: true,
    type: string,
  },
  password: {
    required: true,    
    type: string,
  }
});
module.exports = mongoose.model("Password", PasswordSchema);
