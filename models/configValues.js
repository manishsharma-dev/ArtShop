const mongoose = require('mongoose');

// Define your schema
const configValuesSchema = new mongoose.Schema({
  cd: String,
  value: String,
});

// Register the model
module.exports = mongoose.model('ConfigValues', configValuesSchema);