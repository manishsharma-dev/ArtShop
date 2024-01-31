const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const PasswordSchema = new Schema({
  userId: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  password: {
    required: true,
    type: String,
  }
});

PasswordSchema.pre('save', async function (req, res, next) {
  this.password = await bcrypt.hash(this.password, 10);
});

PasswordSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
}

module.exports = mongoose.model("Password", PasswordSchema);
