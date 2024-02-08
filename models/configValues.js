const mongoose = require('mongoose');

// Define your schema
const ConfigValuesSchema = new mongoose.Schema({
  cd: String,
  value: String,
});

// Register the model
module.exports = ConfigValuesSchema