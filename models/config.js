const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ConfigValuesSchema = require("./configValues");
const configSchema = new Schema({
    type: {
        type: String,
        unique: true,
        required: true,
    },
    values: [ConfigValuesSchema],
});

module.exports = mongoose.model("Config", configSchema);